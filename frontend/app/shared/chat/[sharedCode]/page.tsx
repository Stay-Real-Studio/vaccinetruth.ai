import axios from "axios";
import type { Metadata, ResolvingMetadata } from "next";

import { getSharedChatItems } from "@/lib/api/chat/chat";
import { getFirstChatMessageItem } from "@/lib/api/shared/util";
import { DisplayChatMessageArea } from "@/lib/components/DisplayChatMessageArea";
import { DEFAULT_BACKEND_URL } from "@/lib/config/CONSTANTS";

import { SharedPageTitle } from "../../components/SharedPageTitle";
import TalkToVT from "../../components/TalkToVT";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = { params: { lng: string; sharedCode: string } };
export const generateMetadata = async (
  { params: { lng = "en", sharedCode } }: Props,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  parent?: ResolvingMetadata
): Promise<Metadata> => {
  const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL ?? DEFAULT_BACKEND_URL}`,
  });
  const res = await getSharedChatItems(sharedCode, axiosInstance);

  const chatMessageItem = getFirstChatMessageItem(res);

  return {
    title: `vaccinetruth.ai`,
    description: `Q: ${
      chatMessageItem.length > 0
        ? chatMessageItem[0].body.user_message
        : "vaccinetruth.ai"
    } \n A: ${chatMessageItem[0].body.assistant}`,
    openGraph: {
      images: [
        {
          url: "https://vaccinetruth.ai/vt-logo-256.png",
          width: 256,
          height: 256,
        },
      ],
      locale: lng,
    },
  };
};

const SharedChatPage = (): JSX.Element => {
  return (
    <div
      className={`flex flex-col flex-1 items-center justify-stretch w-full h-fill-available overflow-hidden  dark:bg-vt-700 transition-colors ease-out duration-500`}
      data-testid="chat-page"
    >
      <SharedPageTitle />
      <div
        className={`flex flex-col flex-1 h-full dark:shadow-primary/25 overflow-hidden justify-center`}
      >
        <DisplayChatMessageArea />
      </div>
      <TalkToVT />
    </div>
  );
};

export default SharedChatPage;
