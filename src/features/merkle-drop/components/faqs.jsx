import React from "react";
import { QuestionMark } from "../../common/components/icons/question-mark";
import { ArrowDownRight } from "../../common/components/icons/arrow-down-right";

const CONTENTS = [
  {
    question: "What is the Beamer Bridge Merkle drop?",
    answer: (
      <div>
        The Beamer Bridge Merkle drop is a token distribution for the Beamer Bridge Token.
      </div>
    ),
  },
];

export function MerkleDropFaqs() {
  return (
    <section>
      <div className="md:container mx-auto md:px-20 md:py-32 py-10 merkle-drop-faq">
        <div>
          <div>
            <h1 className="text-4xl md:text-5xl leading-tight md:my-8 md:mx-0 font-semibold text-grey-darker text-opacity-60 px-4">
              Merkle Drop FAQ
            </h1>
          </div>
        </div>
        <div className="flex flex-row justify-center px-4">
          <div className="flex flex-col md:w-1/2">
            {CONTENTS.map((content, i) => (
              <div className="md:py-0 py-4 md:mb-12" key={"question-"+i}>
                <div className="flex flex-row items-center md:py-8">
                  <div className="mr-4">
                    <QuestionMark className="md:w-8 md:h-8 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="md:text-2xl text-xl font-semibold text-grey-darker">
                      {content.question}
                    </h3>
                  </div>
                </div>
                <div className="flex flex-row items-center">
                  <div className="md:px-4 animate-pulse">
                    <ArrowDownRight />
                  </div>
                  <div className="md:pl-2 pl-4 pr-8 text-off-white md:text-lg pt-2 sm:pt-0 font-normal">
                    {content.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
