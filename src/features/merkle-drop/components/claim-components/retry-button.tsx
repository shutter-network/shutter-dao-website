import React from "react";
import { Button } from "../../../common/components/button";
import { TrashIcon} from "@heroicons/react/24/solid"

type Props = {
  reset: () => void;
  className?: string;
  showText?: boolean;
};
function RetryButton(props: Props) {
  const showText = props.showText || false;
  const classNames =
    props.className ||
    "px-8 py-3 mx-2 bg-majorelle-blue hover:bg-majorelle-blue-light hover:text-off-white";

  return (
    <div>
      <div>
        <Button
          isDark
          onClick={props.reset}
          className={classNames}
        >
          <div className="flex flex-row items-center align-middle">
            <TrashIcon className="h-5" />
            {showText && <span className="pt-1 pl-1">Enter different address</span>}
          </div>

          </Button>
      </div>
    </div>
  );
}

export default RetryButton;
