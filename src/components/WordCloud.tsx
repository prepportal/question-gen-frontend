"use client";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import React from "react";
import D3WordCloud from "react-d3-cloud";

type Props = {
  //   formattedTopics: { text: string; value: number }[];
};

const data = [
  { text: "blockchain", value: 3 },
  { text: "Linux", value: 3 },
  { text: "hacking", value: 3 },
  { text: "malwares", value: 3 },
  { text: "hacking", value: 3 },
  { text: "politics", value: 3 },
  { text: "world affairs", value: 3 },
  { text: "politics", value: 3 },
  { text: "India", value: 3 },
  { text: "finance", value: 3 },
  { text: "business", value: 3 },
  { text: "history", value: 3 },
  { text: "science", value: 3 },
  { text: "technology", value: 3 },
  { text: "computer science", value: 3 },
  { text: "physics", value: 3 },
  { text: "astronomy", value: 3 },
  { text: "cryptocurrencies", value: 3 },
  { text: "artificial intelligence", value: 3 },
  { text: "machine learning", value: 3 },
  { text: "deep learning", value: 3 },
  { text: "neural networks", value: 3 },
  { text: "data science", value: 3 },
  { text: "big data", value: 3 },
  { text: "world war 2", value: 3 },
  { text: "space", value: 3 },
  { text: "web3", value: 3 },
  { text: "NFTs", value: 3 },
];
const fontSizeMapper = (word: { value: number }) => {
  return Math.log2(word.value) * 5 + 16;
};

const WordCloud = (props: Props) => {
  const theme = useTheme();
  const router = useRouter();

  return (
    <>
      <D3WordCloud
        data={data}
        height={550}
        font="Times"
        fontSize={fontSizeMapper}
        rotate={0}
        padding={10}
        fill={theme.theme === "dark" ? "white" : "black"}
        onWordMouseOver={(e, d) => {
          e.target.style.cursor = "pointer";
        }}
        onWordClick={(e, d) => {
          router.push("/quiz?topic=" + d.text + "&type=mcq");
        }}
      />
    </>
  );
};

export default WordCloud;
