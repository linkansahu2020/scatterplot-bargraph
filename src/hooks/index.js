import { useEffect, useState } from "react";

const useBarChart = (data) => {
  const [alcohol, setAlcohol] = useState([]);
  useEffect(() => {
    const arrary = [];
    for (let i = 0; i < data.length; i++) {
      const check = !!arrary.find((ele) => ele === data[i]["Alcohol"]);
      if (check) {
        setAlcohol((prev) => [
          ...prev.filter((ele) => ele.value !== data[i]["Alcohol"]),
          {
            value: data[i]["Alcohol"],
            acid: [
              ...prev.find((ele) => ele.value === data[i]["Alcohol"]).acid,
              data[i]["Malic Acid"],
            ],
            count:
              prev.find((ele) => ele.value === data[i]["Alcohol"]).count + 1,
          },
        ]);
      } else {
        arrary.push(data[i]["Alcohol"]);
        setAlcohol((prev) => [
          ...prev,
          {
            value: data[i]["Alcohol"],
            acid: [data[i]["Malic Acid"]],
            count: 1,
          },
        ]);
      }
    }
  }, [data]);
  return {
    barData: alcohol.map((ele) => {
      return [
        ele.value,
        ele.acid.reduce((a, b) => {
          return a + b;
        }, 0) / ele.count,
      ];
    }),
  };
};

export { useBarChart };
