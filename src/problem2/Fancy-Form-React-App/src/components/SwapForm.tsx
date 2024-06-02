import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Token } from "../App";
import { setReceiveToken, setSellToken } from "../redux/feature/tokenSlice";
import { AppDispatch, RootState } from "../redux/store";

const imgTokenURL = import.meta.env.VITE_TOKEN_IMAGE_URL;

export const SwapForm: React.FC<{ tokens: Token[] }> = ({ tokens }) => {
  const {
    register,
    handleSubmit,

  } = useForm();
  const dispatch = useDispatch<AppDispatch>();

  const { sellToken, receiveToken } = useSelector(
    (state: RootState) => state.token
  );
  const [selectBox, setSelectBox] = useState<string>("sell" || "receive");
  const [toggleFormula, setToggleFormula] = useState<boolean>(false);

  const transferFormula = () => {
    setToggleFormula(!toggleFormula);
  };

  const renderFormula = () => {
    if (!toggleFormula) {
      return (
        sellToken &&
        receiveToken &&
        sellToken !== null &&
        receiveToken !== null && (
          <span>
            1 {sellToken.currency} ={" "}
            {(sellToken.price / receiveToken.price).toFixed(6)}{" "}
            {receiveToken.currency}
          </span>
        )
      );
    } else {
      return (
        sellToken &&
        receiveToken &&
        sellToken !== null &&
        receiveToken !== null && (
          <span>
            1 {receiveToken.currency} ={" "}
            {(receiveToken.price / sellToken.price).toFixed(6)}{" "}
            {sellToken.currency}
          </span>
        )
      );
    }
  };

  const handleSwapClick = () => {
    setSellValue(receiveValue);
    setReceiveValue(sellValue);
    const temp = sellToken && sellToken;
    temp && dispatch(setReceiveToken(temp));
    receiveToken && dispatch(setSellToken(receiveToken));
    // dispatch(swapTokens());
  };

  const selectToken = (token: Token) => {
    if (
      selectBox == "receive" &&
      sellToken !== null &&
      receiveToken == null &&
      token == sellToken
    ) {
      dispatch(setReceiveToken(sellToken));
      receiveToken && dispatch(setSellToken(receiveToken));
    }
    if (
      selectBox == "sell" &&
      sellToken == null &&
      receiveToken !== null &&
      token == receiveToken
    ) {
      dispatch(setSellToken(receiveToken));
      sellToken && dispatch(setReceiveToken(sellToken));
    }
    if (
      selectBox == "receive" &&
      sellToken !== null &&
      receiveToken !== null &&
      token == sellToken
    ) {
      dispatch(setReceiveToken(sellToken));
      dispatch(setSellToken(receiveToken));
    }

    if (
      selectBox == "sell" &&
      sellToken !== null &&
      receiveToken !== null &&
      token == receiveToken
    ) {
      dispatch(setSellToken(receiveToken));
      dispatch(setReceiveToken(sellToken));
    }

    if (selectBox == "sell") {
      dispatch(setSellToken(token));
    } else {
      dispatch(setReceiveToken(token));
    }
  };

  const [sellValue, setSellValue] = useState<number>(0);
  const [receiveValue, setReceiveValue] = useState<number>(0);

  useEffect(() => {
    if (receiveToken !== null && sellToken !== null) {
      setReceiveValue((sellToken.price / receiveToken.price) * sellValue);
    }
  }, [sellToken]);

  useEffect(() => {
    if (receiveToken !== null && sellToken !== null)
      setSellValue((receiveToken.price / sellToken.price) * receiveValue);
  }, [receiveToken]);
  const calculateTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value == "" || isNaN(parseFloat(e.target.value))) {
      setSellValue(0);
      setReceiveValue(0);
      return;
    }
    const inputAt = e.target.name;
    const inputValue = parseFloat(e.target.value);

    if (inputAt === "sell") {
      setSellValue(inputValue);
      if (sellToken !== null && receiveToken !== null) {
        const amountToReceive = sellToken.price / receiveToken.price;
        setReceiveValue(amountToReceive * inputValue);
      } else {
        return false;
      }
    } else if (inputAt === "receive") {
      setReceiveValue(inputValue);

      if (sellToken !== null && receiveToken !== null) {
        const amountToSend = receiveToken.price / sellToken.price;
        setSellValue(amountToSend * inputValue);
      } else {
        return false;
      }
    }
  };

  const onSubmit = (data:any) => {
    if(data.sell == "0"){
        return alert("Please Input Amount To Send or Amount to Receive greater than 0!")
    }
    if(!data.token_send || !data.token_receive){
        return alert("Please select a Token to send!")
    }
  };
  return (
    <>
      <div id="swap-form" className="container">
        <form
          action=""
          className="text-light"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="heading-swapbox mb-2">
            <span>Swap</span>
          </div>
          <div className="swapbox-currency ">
            <div className="title-label">
              <span>Amount to send</span>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <input
                type="text"
                className="bg-transparent"
                id="swap-currency-input"
                autoComplete="false"
                inputMode="decimal"
                placeholder="0"
                {...register("sell", {
                  required: "This field is required",
                  min: {
                    value: 0,
                    message: "Value must be greater than 0",
                  },
                })}
                name="sell"
                value={sellValue}
                onChange={calculateTo}
              />

              <button
                type="button"
                className="btn-select-token"
                data-bs-toggle="modal"
                data-bs-target="#tokenListModal"
                onClick={() => setSelectBox("sell")}
              >
                {sellToken !== null ? (
                  <div className="selected-token gap-2 d-flex text-light align-items-center ">
                    <img
                      src={`${imgTokenURL}/${sellToken.currency}.svg`}
                      alt="icon-tokens"
                    />
                    <div className="token-name">
                      <span>{sellToken.currency}</span>
                    </div>
                    <span className="chevron-down">
                      <i className="fa-solid fa-chevron-down"></i>
                    </span>
                    <input
                      type="hidden"
                      value={sellToken.currency}
                      {...register("token_send", {
                        required: "This field is required",
                      })}
                      name="token_send"
                    />
                  </div>
                ) : (
                  <div className="select-token gap-2 d-flex text-light align-items-center ">
                    <div className="token-name ">
                      <span>Select Token</span>
                    </div>
                    <span className="chevron-down">
                      <i className="fa-solid fa-chevron-down"></i>
                    </span>
                    
                  </div>
                )}
                <div className=" d-none select-token gap-2 d-flex text-light align-items-center ">
                  <div className="token-name">
                    <span>Select Token</span>
                  </div>
                  <span className="chevron-down">
                    <i className="fa-solid fa-chevron-down"></i>
                  </span>
                </div>
              </button>
            </div>
            {sellToken !== null && (
              <span>Price: ${sellToken?.price.toFixed(4)}</span>
            )}
          </div>
          <div className="swap-position" onClick={handleSwapClick}>
            <span className="swap-icon">
              <i className="fa-solid fa-retweet"></i>
            </span>
          </div>
          <div className="swapbox-currency ">
            <div className="title-label">
              <span>Amount to receive</span>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <input
                type="text"
                className="bg-transparent"
                id="swap-currency-input"
                autoComplete="false"
                placeholder="0"
                {...register("receive", {
                  required: "This field is required",
                  min: {
                    value: 0,
                    message: "Value must be greater than 0",
                  },
                })}
                name="receive"
                value={receiveValue}
                onChange={calculateTo}
              />
              <button
                type="button"
                className="btn-select-token"
                data-bs-toggle="modal"
                data-bs-target="#tokenListModal"
                onClick={() => setSelectBox("receive")}
              >
                {receiveToken !== null ? (
                  <div className="selected-token gap-2 d-flex text-light align-items-center ">
                    <img
                      src={`${imgTokenURL}/${receiveToken.currency}.svg`}
                      alt="icon-tokens"
                    />
                    <div className="token-name">
                      <span>{receiveToken.currency}</span>
                    </div>
                    <span className="chevron-down">
                      <i className="fa-solid fa-chevron-down"></i>
                    </span>
                    <input
                      type="hidden"
                      value={receiveToken.currency}
                      {...register("token_receive", {
                        required: "This field is required",
                      })}
                      name="token_send"
                    />
                  </div>
                ) : (
                  <div className="select-token gap-2 d-flex text-light align-items-center ">
                    <div className="token-name ">
                      <span>Select Token</span>
                    </div>
                    <span className="chevron-down">
                      <i className="fa-solid fa-chevron-down"></i>
                    </span>
                  </div>
                )}
              </button>
            </div>
            {receiveToken !== null && (
              <span>Price: ${receiveToken?.price.toFixed(4)}</span>
            )}
          </div>

          {sellToken &&
            receiveToken &&
            sellToken !== null &&
            receiveToken !== null && (
              <div className="mt-2" onClick={transferFormula}>
                {renderFormula()}
              </div>
            )}

          <button
            className="w-100 btn btn-large btn-block mt-2"
            type="submit"
            id="swap_button"
          >
            <span className="swap_button-text">CONFIRM SWAP</span>
          </button>
        </form>
      </div>

      <div
        className="modal fade"
        id="tokenListModal"
        tabIndex={-1}
        aria-labelledby="tokenListModalLabel"
        aria-hidden="true"
      >
        <div className="modal-token-list modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-head m-3">
              <div className="d-flex justify-content-between algin-items-center mb-3">
                <h1 className="modal-title fs-6" id="tokenListModalLabel">
                  Select a token for {selectBox} currency
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className=" search-group">
                <span className="search-icon">
                  <i className="fa-solid fa-search"></i>
                </span>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search name or paste address"
                />
              </div>
              {receiveToken !== null && sellToken !== null && (
                <div className="selected-token d-flex gap-1">
                  <img
                    src={
                      selectBox == "sell"
                        ? `${imgTokenURL}/${sellToken?.currency}.svg`
                        : `${imgTokenURL}/${receiveToken?.currency}.svg`
                    }
                    alt="selected-token"
                  />
                  <span className="token-name">
                    {selectBox == "sell"
                      ? `${sellToken?.currency}`
                      : `${receiveToken?.currency}`}
                  </span>
                </div>
              )}
            </div>

            <div className="body-modal">
              <h1 className="fs-6 mx-3 mb-3">Polular tokens</h1>
              <ul className="token-list">
                {tokens?.map((token, idx: number) => {
                  return (
                    <li
                      key={idx}
                      className="token-item d-flex gap-2"
                      data-bs-dismiss="modal"
                      onClick={() => selectToken(token)}
                    >
                      <img
                        src={`${imgTokenURL}/${token.currency}.svg`}
                        alt={token.currency}
                      />
                      <span>{token.currency}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
