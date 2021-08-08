import BlockContent from "@sanity/block-content-to-react";
import HighlightCode from "components/HighlightCode";
import { urlFor } from "lib/api";

const serializers = {
  types: {
    code: ({ node: { language, code } }) => {
      return <HighlightCode language={language}>{code}</HighlightCode>;
    },
    image: ({ node: { asset, alt, position = "center" } }) => {
      return (
        <div className={`blog-image-${position}`}>
          <img src={urlFor(asset).height(300).fit("max").url()} />
          <div className="image-alt">{alt}</div>
        </div>
      );
    },
    break: (props) => {
      const { style } = props.node;
      if (style === "break") {
        return <br />;
      }
      // if (readMore && style === "readMore") {
      //   return (
      //     <div className="readMore">
      //       <button onClick={() => setReadMore(false)}>Read More</button>
      //     </div>
      //   );
      // }
      return null;
    },
    link: ({ mark, children }) => {
      // Read https://css-tricks.com/use-target_blank/
      const { blank, href } = mark;

      return blank ? (
        <a href={href} target="_blank" rel="noopener">
          {children}
        </a>
      ) : (
        <a href={href}>{children}</a>
      );
    },
  },
};

const BlogContent = ({ content }) => (
  <BlockContent serializers={serializers} blocks={content} />
);

export default BlogContent;
