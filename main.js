let storiesUL = document.getElementById('stories')
let storiesURL = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
let storyURLs = []
let allStories= []

function getStories(){
fetch(storiesURL)
.then(function(response){
  return response.json()
}).then(function(stories) {
  return stories
}).then(function(storiesArr){
  storiesArr.forEach(function(storyNo){
    storyURLs.push("https://hacker-news.firebaseio.com/v0/item/" + storyNo + ".json?print=pretty")
})
storyURLs.forEach(function(storyURL){
fetch(storyURL)
.then(function(response){
  return response.json()
}).then(function(story) {
  return story
  }).then(function(storyURL){
      let storyInfo = {title: storyURL["title"], url: storyURL["url"], by: storyURL["by"], time: storyURL["time"]}
      allStories.push(storyInfo)
    let stories = allStories.map(function(story){
        return `<li><h4>${story.title}</h4>
                Link: <a href="${story.url}">${story.url}</a><br />
                By: ${story.by}<br />
                Date: ${new Date(story.time)}
              </li>`
    })
    storiesUL.innerHTML = stories.join('')
  })
})
})
}

getStories()
