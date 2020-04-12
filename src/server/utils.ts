import util from "util";

export const prettyPrint = (response: any) => {
  console.log(util.inspect(response, { colors: true, depth: 4 }));
};
