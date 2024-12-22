# `Context.io`

<p align="left">
    <img src="https://img.shields.io/badge/version-v.1.0-blue" alt="version" >
	<img src="https://img.shields.io/github/last-commit/avi4h/playcontexto?logo=git" alt="last-commit">
	<img src="https://img.shields.io/github/languages/count/avi4h/playcontexto?logo=googletagmanager" alt="repo-language-count">
    <img src="https://img.shields.io/github/issues-raw/avi4h/playcontexto?logo=github" alt="repo-language-count">
	<img src="https://img.shields.io/github/languages/top/avi4h/playcontexto?logo=javascript" alt="repo-top-language">
	<img src="https://img.shields.io/github/license/avi4h/playcontexto?logo=opensourceinitiative" alt="license">
</p>


Faster replica of the popular word guessing game Contexto.me. Site has a perfect score of 100/100 in all four aspects of Google Lighthouse, for its performance, accessibility, best practices, and SEO.

## Features

**Modern Tech Stack**: Built with React and styled using Tailwind CSS for a responsive and visually appealing interface.

**GloVe Algorithm**: Utilizes the GloVe algorithm to build the word list, ensuring accurate and meaningful word proximity calculations.

**High Performance**: Achieved a perfect score of 100/100 in Google Lighthouse for performance, accessibility, best practices, and SEO.

**CORS Handling**: Uses AllOrigins to prevent CORS issues when fetching data from the api.contexto.me API.

**Error Handling**: Enhanced error handling with better UI transitions compared to the original Contexto.me.

## Technical Stack

<p align="center"> 
    <img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black" alt="React"> 
    <img src="https://img.shields.io/badge/Vite-646CFF.svg?style=flat&logo=Vite&logoColor=white" alt="Vite"> 
    <img src="https://img.shields.io/badge/Tailwind%20CSS-38B2AC.svg?style=flat&logo=Tailwind%20CSS&logoColor=white" alt="Tailwind CSS">
    <img src="https://img.shields.io/badge/GloVe-9463C6?style=flat&logo=Akamai&logoColor=white" alt="GloVe"> 
    <img src="https://img.shields.io/badge/allOrigin-5CDFCB?style=flat&logo=origin&logoColor=white" alt="AllOrigins"> 
    <img src="https://img.shields.io/badge/Contexto%20API-F4EDE2?style=flat&logo=serverless&logoColor=black" alt="Contexto API">
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript"> 
    <img src="https://img.shields.io/badge/HTML5-E34F26.svg?style=flat&logo=HTML5&logoColor=white" alt="HTML5"> 
</p>

## GloVe

GloVe (Global Vectors for Word Representation) is an unsupervised learning algorithm. The training is performed on aggregated global word-word co-occurrence statistics from a corpus, and the resulting representations showcase interesting linear substructures of the word vector space.GloVe is used to build the word list and calculate word proximities. This ensures that the game provides accurate and meaningful word proximity calculations, enhancing the overall user experience.

For more information about GloVe, visit the official [GloVe project](https://nlp.stanford.edu/projects/glove/) page.

## 🙌 Acknowledgments

- Contexto.me for the original game concept.
- GloVe for the word vector representations.
- AllOrigins for the CORS proxy service.

Enjoy playing and happy guessing!                     






