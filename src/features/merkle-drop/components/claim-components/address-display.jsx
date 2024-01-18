import React from "react";
function AddressDisplay(props) {
  return (
    <form className="flex flex-row w-full">
      <div className="flex flex-row items-center w-full rounded-full bg-grey-lighter text-shutter-black-ligther h-12 my-4">
        <input
          className="bg-grey-lighter mx-2 px-2 w-full rounded-full placeholder-shutter-black-lightest text-center"
          autoComplete="off"
          spellCheck="false"
          type="text"
          value={props.address}
          readOnly
        />
      </div>
    </form>
  );
}

export default AddressDisplay;
