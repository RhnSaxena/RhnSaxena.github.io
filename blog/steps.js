a = {
  "@context": "http://schema.org",
  "@type": "HowTo",
  name: "How to deploy a trivia app on Google Assistant",
  description:
    "In this tutorial, I will be guiding you to creating your first trivia app and deploying on the Google Assistant actions.",
  image: {
    "@type": "ImageObject",
    url:
      "https://rohansaxena.in/static/photos/assistant/howto-deploytrivia.jpg",
    height: "406",
    width: "305",
  },
  supply: [
    {
      "@type": "HowToSupply",
      name: "tiles",
    },
    {
      "@type": "HowToSupply",
      name: "thin-set mortar",
    },
    {
      "@type": "HowToSupply",
      name: "tile grout",
    },
    {
      "@type": "HowToSupply",
      name: "grout sealer",
    },
  ],
  tool: [
    {
      "@type": "HowToTool",
      name: "notched trowel",
    },
    {
      "@type": "HowToTool",
      name: "bucket",
    },
    {
      "@type": "HowToTool",
      name: "large sponge",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      url: "https://example.com/kitchen#step1",
      name: "Prepare the surfaces",
      itemListElement: [
        {
          "@type": "HowToDirection",
          text: "Go to https://console.actions.google.com",
        },
        {
          "@type": "HowToDirection",
          text: "Enter a name for your project and click CREATE PROJECT.",
        },
        {
          "@type": "HowToDirection",
          text:
            "After creating the project go to Click on Templates under More options.",
        },
        {
          "@type": "HowToDirection",
          text: "Select Trivia after clicking on Templates..",
        },
        {
          "@type": "HowToDirection",
          text: "Click on Next and then click on Get Started.",
        },
        {
          "@type": "HowToDirection",
          text:
            "In the prompt, click Trivia Template, which opens a new tab. Click make a copy.",
        },
        {
          "@type": "HowToDirection",
          text:
            "Update the Questions & Answers tab of your sheet copy with your own questions, answers, and hints. Try adding fun follow-ups that give users extra facts about the answer.",
        },
        {
          "@type": "HowToDirection",
          text:
            "Update the Configuration tab of the sheet with the name of your Action.",
        },
        {
          "@type": "HowToDirection",
          text:
            "Click on Share tab on the upper left corner and make it public.",
        },
        {
          "@type": "HowToDirection",
          text:
            "Go back to your action console and copy and paste your Google Sheet’s URL into the text field and click UPLOAD.",
        },
        {
          "@type": "HowToDirection",
          text: "Click on Create App.",
        },
        {
          "@type": "HowToDirection",
          text:
            "After your application is created without any errors test your app in the simulator.",
        },
        {
          "@type": "HowToDirection",
          text: "Submit your action.",
        },
      ],
    },
  ],
  totalTime: "P2D",
};
