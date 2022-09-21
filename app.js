const APIEndpoint = "http://api.quotable.io/random";
const textToWrite = document.querySelector(".text-to-write")
let ApiContent = {};
const fetchSentence = async () => {
  try {
    let response = await fetch(APIEndpoint)
    let result =  await response.json()
    //console.log(result)
    ApiContent.lengthApiSentence = result.length
    ApiContent.ApiSentence = result.content
    console.log("ApiContent", ApiContent)
    displayContent(ApiContent)
  } catch (error) {
    console.log(error)
  }
}

const displayContent = (ApiContent) => {
  textToWrite.textContent = ApiContent.ApiSentence;
}
fetchSentence()
