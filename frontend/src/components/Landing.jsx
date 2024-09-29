import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <section className="relative h-full max-w-screen">
      <img
        src="./shellhacksbg.png"
        alt="gradient shellhacks background image"
        className="absolute -z-50 w-full h-full"
      />
      <div className="absolute top-0 left-0 w-full h-full"></div>
      <div className="relative z-10 gap-5 items-center lg:flex min-h-screen">
        <div className="lg:mb-20 p-8 lg:p-0 relative self-center lg:left-[20%] flex-1 max-w-lg py-5 sm:mx-auto sm:text-center lg:max-w-max lg:text-left">
          <h3 className="text-3xl text-white font-semibold md:text-4xl xl:text-5xl">
            MAP YOUR FINANCIAL
          </h3>
          <p className="text-white leading-relaxed mt-3 lg:w-[70%]">
            Leverage artifical intelligence to connect users with local
            financial resources
          </p>
          <a
            onClick={() => navigate("/search")}
            className="cursor-pointer mt-5 px-4 py-2 text-Magenta-Pink font-medium bg-indigo-50 rounded-full inline-flex items-center"
          >
            Try it out
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 ml-1 duration-150"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </div>
        <div className="lg:mb-36 flex-1 flex justify-center mx-auto sm:w-9/12 lg:w-auto">
          <img
            src="./hands.png"
            alt="picture of circle with hands floating above it"
            className="max-h-[20rem] max-w-[20rem] lg:max-w-[40rem] lg:max-h-[40rem]"
          />
        </div>
      </div>
      <div className="p-8 lg:p-20">
        <div className="text-4xl text-nunmed text-white flex justify-center">
          HOW DO I CHART MY COURSE?
        </div>
        <div className="text-xl text-nunmed text-white flex justify-center lg:text-center mt-10">
          Finding financial institutions and economic resources can be
          challenging for immigrants due to the unfamiliarity with living in a
          new country. FINATLAS is designed to assist immigrants with navigating
          this process. Here is a step-to-step guide on how to utilize this
          platform
        </div>
        <div className="text-xl bg-Magenta-Pink text-nunmed p-1 font-bold text-white flex rounded-[20rem] justify-center lg:text-center mt-10">
          1. Input a relevant question
        </div>
        <div className="text-xl text-nunmed text-white flex font-bold justify-center lg:text-center mt-10">
          Locate the Prompt Box. Enter in your question concerning financial and
          economic topics.
        </div>
        <div className="text-xl text-nunmed bg-Magenta-Pink p-1 font-bold text-white flex justify-center rounded-[20rem] lg:text-center mt-10">
          2. Await AI Assistant&apos;s Answer{" "}
        </div>
        <div className="text-xl text-nunmed text-white flex font-bold justify-center lg:text-center mt-10">
          With relevant questions, you will receive a written response alongside
          a list of local critical resources from the AI Assistant. In the case
          that the question was irrelevant, the AI Assistant will inform you.
        </div>
        <div className="text-xl text-nunmed bg-Magenta-Pink p-1 font-bold text-white flex justify-center rounded-[20rem] lg:text-center mt-10">
          3. View the Map of Resources{" "}
        </div>
        <div className="text-xl text-nunmed text-white flex font-bold justify-center lg:text-center mt-10">
          Following a response, the platform will display the locations of the
          local resources on an interactive map widget.
        </div>
      </div>
    </section>
  );
}
