import { useTranslation } from "react-i18next";

import { useChatContext } from "@/lib/context";
import { useFetch, useToast } from "@/lib/hooks";
import { useSecurity } from "@/services/useSecurity/useSecurity";

import { ChatQuestion } from "../types";
import { generatePlaceHolderMessage } from "../utils/generatePlaceHolderMessage";
// eslint-disable-next-line import/order
import { useHandleStream } from "./useHandleStream";

interface UseChatService {
  addStreamQuestion: (
    chatId: string,
    chatQuestion: ChatQuestion
  ) => Promise<void>;
}

export const useQuestion = (): UseChatService => {
  const { fetchInstance } = useFetch();

  const { t } = useTranslation(["chat"]);
  const { publish } = useToast();
  const { handleStream } = useHandleStream();
  const { removeMessage, updateStreamingHistory } = useChatContext();
  const { isStudioMember } = useSecurity();

  const handleFetchError = async (response: Response) => {
    if (response.status === 429) {
      publish({
        variant: "danger",
        text: t("tooManyRequests", { ns: "chat" }),
      });

      return;
    }

    const errorMessage = (await response.json()) as { detail: string };
    publish({
      variant: "danger",
      text: errorMessage.detail,
    });
  };

  const addStreamQuestion = async (
    chatId: string,
    chatQuestion: ChatQuestion
  ): Promise<void> => {
    const headers = {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
    };

    const placeHolderMessage = generatePlaceHolderMessage({
      user_message: chatQuestion.question ?? "",
      chat_id: chatId,
    });
    updateStreamingHistory(placeHolderMessage);

    const body = JSON.stringify(chatQuestion);

    try {
      const brainId = isStudioMember
        ? chatQuestion.brain_id
        : process.env.NEXT_PUBLIC_DEFAULT_BRAIN_ID;

      const response = await fetchInstance.post(
        `/chat/${chatId}/question/stream?brain_id=${brainId ?? ""}`,
        body,
        headers
      );
      if (!response.ok) {
        void handleFetchError(response);

        return;
      }

      if (response.body === null) {
        throw new Error(t("resposeBodyNull", { ns: "chat" }));
      }

      await handleStream(response.body.getReader(), () =>
        removeMessage(placeHolderMessage.message_id)
      );
    } catch (error) {
      publish({
        variant: "danger",
        text: String(error),
      });
    }
  };

  return {
    addStreamQuestion,
  };
};
