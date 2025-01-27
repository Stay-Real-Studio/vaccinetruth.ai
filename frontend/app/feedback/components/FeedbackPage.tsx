/* eslint-disable max-lines */
"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaSpinner } from "react-icons/fa";

import { HomeHeader } from "@/app/(home)/components";
import { NotificationsVT } from "@/lib/components/NotificationsVT";
import Button from "@/lib/components/ui/Button";

import { useFeedback } from "../hooks/useFeedback";

const FeedbackPage = (): JSX.Element => {
  const { t } = useTranslation(["vaccineTruth"]);

  const [title, setTitle] = useState<string | undefined>("");
  const [content, setContent] = useState<string | undefined>("");

  const {
    handleSave,
    addFeedbackStatus,
    visibleNotification,
    resetStatus,
    isloading,
  } = useFeedback();

  return (
    <div className=" ">
      <HomeHeader />
      <div className="divide-y divide-gray-900/10 px-8 py-28 sm:px-16">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3 py-4">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
              {t("feedbackIntro")}
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-slate-200">
              {t("feedbackSubIntro")}
            </p>
          </div>

          <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 dark:bg-gray-600">
            <div className="px-4 py-6 sm:p-8">
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="website"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
                  >
                    {t("feedbackTitle")}
                  </label>
                  <div className="mt-2">
                    <div className="">
                      <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="dark:text-slate-200 block w-full bg-transparent rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-purple-200 sm:text-sm sm:leading-6"
                        placeholder={t("feedbackPlaceholder")}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
                  >
                    {t("feedbackContent")}
                  </label>
                  <div className="mt-2">
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      id="about"
                      name="about"
                      rows={3}
                      className="dark:text-slate-200 block w-full bg-transparent rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-purple-200 sm:text-sm sm:leading-6"
                      placeholder={t("feedbackPlaceholder")}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-8 py-4 sm:px-8">
              <button
                onClick={() => {
                  setTitle("");
                  setContent("");
                }}
                className="text-sm font-semibold leading-6 text-gray-900 dark:text-slate-200"
              >
                {t("feedbackReset")}
              </button>

              <Button
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={async () => {
                  await handleSave(title, content);
                }}
                className="px-4 py-2 bg-black"
              >
                {t("feedbackSave")}
                {isloading && <FaSpinner className="animate-spin" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {visibleNotification && (
        <NotificationsVT
          type={addFeedbackStatus}
          info={
            addFeedbackStatus === "success"
              ? t("addFeedbackOkInfo")
              : t("addFeedbackErrorInfo")
          }
          subInfo={
            addFeedbackStatus === "success"
              ? t("addFeedbackOkSubInfo")
              : t("addFeedbackErrorSubInfo")
          }
          resetStatus={resetStatus}
        ></NotificationsVT>
      )}
    </div>
  );
};

export default FeedbackPage;
