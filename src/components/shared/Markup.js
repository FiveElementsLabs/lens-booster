import { HashtagMatcher } from "../utils/matchers/HashtagMatcher.tsx";
import { MDBoldMatcher } from "../utils/matchers/markdown/MDBoldMatcher.tsx";
import { MDCodeMatcher } from "../utils/matchers/markdown/MDCodeMatcher.tsx";
import { MDQuoteMatcher } from "../utils/matchers/markdown/MDQuoteMatcher.tsx";
import { MDStrikeMatcher } from "../utils/matchers/markdown/MDStrikeMatcher.tsx";
import { MentionMatcher } from "../utils/matchers/MentionMatcher.tsx";
import { SpoilerMatcher } from "../utils/matchers/SpoilerMatcher.tsx";
import trimify from "../../lib/trimify";
import { Interweave } from "interweave";
import { UrlMatcher } from "interweave-autolink";
import React, { FC } from "react";

const Markup = ({ children }) => {
  return (
    <Interweave
      content={trimify(children)}
      escapeHtml
      allowList={["b", "i", "a", "br", "code", "span"]}
      newWindow
      matchers={[
        new HashtagMatcher("hashtag"),
        new MentionMatcher("mention"),
        new MDBoldMatcher("mdBold"),
        // new MDItalicMatcher('mdItalic'),
        new MDStrikeMatcher("mdStrike"),
        new MDQuoteMatcher("mdQuote"),
        new MDCodeMatcher("mdCode"),
        new SpoilerMatcher("spoiler"),
        new UrlMatcher("url", { validateTLD: true }),
      ]}
    />
  );
};

export default Markup;
