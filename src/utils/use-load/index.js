import { useEffect, useState } from "react";

function useLoad(condition, minTime = 350) {
  // const [loadParams, setLoadParams] = useState({
  //   timeElapsed: false,
  //   contentLoaded: false,
  // });

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoadParams((loadParams) => ({ ...loadParams, timeElapsed: true }));
  //   }, minTime);
  // }, []);
  // useEffect(() => {
  //   if (condition) {
  //     setLoadParams((loadParams) => ({ ...loadParams, contentLoaded: true }));
  //   }
  // }, [condition]);

  // return loadParams.timeElapsed && loadParams.contentLoaded;
  return condition;
}

export default useLoad;
