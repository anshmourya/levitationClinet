import { Blockquote, H1 } from "@/components/typograph";

const Note = (): JSX.Element => {
  return (
    <>
      <H1 className="text-center">Invoice generation</H1>
      <Blockquote className="text-center">
        the server is hosted on the free tier so get's{" "}
        <b>inactive after 15 mins</b> to restart, it take about 50 secs. after
        restart it will work smoothly, so please consider this.
      </Blockquote>
    </>
  );
};

export default Note;
