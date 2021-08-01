// import { /*useEffect,*/ useState } from "react";

const useHTTP = (method) => {
	

	if (method === "GET") {
		return fetchScores;
	} else {
		return null;
	}
};

export default useHTTP;
