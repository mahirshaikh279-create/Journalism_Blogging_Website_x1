const starterStories = [
  {id:"s1",title:"The art of finding your rhythm",category:"Campus",excerpt:"College life can feel like a hundred tabs open at once. Here's how to build a routine that actually feels like yours.",author:"Mira S.",read:"4 MIN READ",visual:"campus",body:`The first few weeks of college can feel like stepping into a room where everyone already knows what they're doing. New classrooms, new people, new expectations — it is a lot to hold at once.\n\nA routine can help, but it does not need to be a colour-coded masterpiece. Start with three anchors: a regular time to wake up, a short daily review of your classes, and a little space that belongs only to you. The rest can be flexible.\n\nYour best routine is the one that works on an ordinary Tuesday, not just on your most motivated day. Leave room for plans that change, friends who drop by, and the occasional slow morning.\n\nYou are not behind because your rhythm looks different from someone else's. Give yourself a little time to find it.`},
  {id:"s2",title:"Studying smarter, not just longer",category:"Study",excerpt:"A practical reset for study sessions: smaller goals, real breaks, and a plan you can finish.",author:"Rohan K.",read:"5 MIN READ",visual:"study",body:`It is easy to mistake a long study session for a productive one. But sitting with a book open for four hours does not always mean the ideas have settled in.\n\nBefore you begin, write down one specific outcome: solve five problems, revise one concept, or explain a topic in your own words. Keep your phone out of reach for a short focused block, then take a genuine break away from the screen.\n\nActive recall helps more than repeatedly rereading the same page. Close your notes and try to remember the main points. Check what you missed, then try again. It may feel harder, but that effort is part of learning.\n\nAnd please, protect your sleep. Rest is not a reward for finishing everything; it is one of the things that makes learning possible.`},
  {id:"s3",title:"A reminder to take a breath",category:"Wellbeing",excerpt:"You are a student, but you are also a person. Your worth is not a list of grades and deadlines.",author:"Anya D.",read:"3 MIN READ",visual:"wellbeing",body:`Some weeks arrive with deadlines stacked on top of each other. It can start to feel as if every hour should be useful and every break needs to be earned.\n\nTry to notice when your inner voice becomes harsher than you would ever be with a friend. You can take your work seriously without treating yourself unkindly. A missed target is information, not a verdict on who you are.\n\nDrink some water. Step outside for five minutes. Message someone who makes you feel safe. If things feel too heavy to manage alone, talking to a trusted person or a campus support service can be a strong next step.\n\nYou do not have to turn every difficult day into a life lesson. Sometimes getting through it is enough.`},
  {id:"s4",title:"Small steps still count",category:"Growth",excerpt:"Personal growth is rarely a dramatic before-and-after. More often, it is a collection of quiet choices.",author:"Dev P.",read:"4 MIN READ",visual:"growth",body:`We tend to celebrate the big milestones: the result, the certificate, the finished project. The smaller moments are easier to miss — asking a question in class, trying again after a mistake, or finally beginning something you were nervous about.\n\nThose moments matter because they are how confidence is built. You do not need to feel ready before taking a small step. Often, readiness comes after you start.\n\nChoose one thing you would like to get a little better at this month. Make the first step so small that it is difficult to avoid. Then repeat it when you can. Consistency does not have to be perfect to be meaningful.\n\nOne day, you may look back and realise that the little things were moving you forward all along.`},
  {id:"s5",title:"The people who make a place feel like home",category:"Campus",excerpt:"A campus becomes more than buildings and timetables when you find people with whom you can be yourself.",author:"Mira S.",read:"4 MIN READ",visual:"friends",body:`Sometimes the best part of a college day is not the lecture or the assignment you finally understand. It is the conversation after class, the shared snack, or the friend who saves you a seat without needing to ask.\n\nFriendship can take time to grow. You do not need to find your entire circle in the first week. Say hello, join a club that genuinely interests you, or ask someone how they found a difficult class. Small invitations can open a door.\n\nGood friends do not make every day easy, but they can make hard days feel less lonely. Look for people who let you be curious, imperfect, and fully yourself.\n\nAnd remember: belonging is not a popularity contest. A few real connections can mean more than knowing everybody's name.`},
  {id:"s6",title:"Making peace with a busy week",category:"Wellbeing",excerpt:"A gentle way to prioritise when everything seems urgent and your to-do list keeps growing.",author:"Rohan K.",read:"5 MIN READ",visual:"focus",body:`When everything feels urgent, the first step is to get it out of your head. Write down every task, then mark the ones with a real deadline or consequence. Choose the three that matter most today. The rest can wait their turn.\n\nBreak a vague task like “study DBMS” into something concrete, such as “review normalisation notes and answer three questions.” A clear next step is easier to begin than a mountain of work.\n\nLeave some breathing room in your plan. A schedule with every minute filled can collapse the moment something unexpected happens. A little margin is not wasted time; it is what makes the plan realistic.\n\nAt the end of the day, notice what you did accomplish. Tomorrow can have its own list.`}
];

const customKey = "journalism_custom_stories_v1";
let activeCategory = "All";
let stories = [...starterStories, ...loadCustomStories()];

function loadCustomStories() {
  try { const data = JSON.parse(localStorage.getItem(customKey) || "[]"); return Array.isArray(data) ? data : []; }
  catch { return []; }
}
function saveCustomStories() {
  try { localStorage.setItem(customKey, JSON.stringify(stories.filter(s => s.custom))); }
  catch { showToast("Post added for this session, but browser storage is unavailable."); }
}
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
}
function categoryLabel(category) {
  return ({Campus:"CAMPUS LIFE",Study:"STUDY NOTES",Wellbeing:"WELLBEING",Growth:"PERSONAL GROWTH"})[category] || category.toUpperCase();
}
function visualMarkup(story, index) {
  const type = story.visual || ["campus","study","wellbeing","growth","friends","focus"][index % 6];
  let art = "";
  if(type === "campus") art = '<div class="campus-sun"></div><div class="campus-window"></div>';
  else if(type === "study") art = '<div class="study-paper"><span></span><span></span><span></span><span></span><span></span></div><div class="study-pencil"></div>';
  else if(type === "wellbeing") art = '<div class="wellbeing-sun"></div><div class="wellbeing-leaf"></div>';
  else if(type === "growth") art = '<div class="growth-steps"><span></span><span></span><span></span></div><div class="growth-star">✳</div>';
  else if(type === "friends") art = '<div class="friends-circles"><span></span><span></span><span></span></div>';
  else art = '<div class="focus-ring"><span>FOCUS</span></div>';
  return `<div class="story-visual visual-${escapeHTML(type)}"><span class="visual-label">JOURNAL / ${String(index+1).padStart(3,"0")}</span>${art}<span class="visual-index">${String(index+1).padStart(2,"0")}</span></div>`;
}
function renderStories() {
  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  const filtered = stories.filter(story => {
    const categoryMatch = activeCategory === "All" || story.category === activeCategory;
    const haystack = `${story.title} ${story.excerpt} ${story.category} ${story.author} ${story.body}`.toLowerCase();
    return categoryMatch && haystack.includes(query);
  });
  const grid = document.getElementById("storyGrid");
  document.getElementById("storyCount").textContent = String(filtered.length).padStart(2,"0");
  document.querySelectorAll(".filter-chip").forEach(btn => {
    const category = btn.dataset.category;
    btn.classList.toggle("selected", category === activeCategory);
    if(category === "All") btn.innerHTML = `All stories <span>${String(stories.length).padStart(2,"0")}</span>`;
  });
  if(!filtered.length) {
    grid.innerHTML = '<div class="empty-state">No stories found. Try another search or collection.</div>';
    return;
  }
  grid.innerHTML = filtered.map(story => {
    const index = stories.findIndex(item => item.id === story.id);
    return `<article class="story-card">
      ${visualMarkup(story,index)}
      <div class="story-content">
        <div class="story-meta"><span class="story-category">${escapeHTML(categoryLabel(story.category))}</span><span>${escapeHTML(story.read || "4 MIN READ")}</span></div>
        <h3>${escapeHTML(story.title)}</h3>
        <p>${escapeHTML(story.excerpt)}</p>
        <div class="story-bottom"><span>BY ${escapeHTML((story.author || "Guest Writer").toUpperCase())}</span><button class="read-story" data-story-id="${escapeHTML(story.id)}">Read story <span>↗</span></button></div>
      </div>
    </article>`;
  }).join("");
  grid.querySelectorAll(".read-story").forEach(btn => btn.addEventListener("click", () => openReader(btn.dataset.storyId)));
}
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.style.display = "block";
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.style.display = "none", 2800);
}
function openEditor() {
  document.getElementById("editorModal").hidden = false;
  document.body.style.overflow = "hidden";
  setTimeout(() => document.getElementById("storyTitle").focus(), 50);
}
function closeEditor() {
  document.getElementById("editorModal").hidden = true;
  document.body.style.overflow = "";
}
function openReader(id) {
  const story = stories.find(item => item.id === id);
  if(!story) return;
  document.getElementById("readerCategory").textContent = `JOURNAL / ${categoryLabel(story.category)}`;
  document.getElementById("readerMeta").textContent = `BY ${(story.author || "GUEST WRITER").toUpperCase()}   ·   ${story.read || "4 MIN READ"}`;
  document.getElementById("readerTitle").textContent = story.title;
  document.getElementById("readerExcerpt").textContent = story.excerpt;
  document.getElementById("readerBody").textContent = story.body;
  document.getElementById("readerModal").hidden = false;
  document.body.style.overflow = "hidden";
}
function closeReader() {
  document.getElementById("readerModal").hidden = true;
  document.body.style.overflow = "";
}
document.getElementById("filterList").addEventListener("click", event => {
  const btn = event.target.closest("[data-category]");
  if(!btn) return;
  activeCategory = btn.dataset.category;
  renderStories();
});
document.getElementById("searchInput").addEventListener("input", renderStories);
document.getElementById("openEditor").addEventListener("click", openEditor);
document.getElementById("heroWrite").addEventListener("click", openEditor);
document.getElementById("aboutWrite").addEventListener("click", openEditor);
document.getElementById("closingWrite").addEventListener("click", openEditor);
document.getElementById("closeEditor").addEventListener("click", closeEditor);
document.getElementById("cancelEditor").addEventListener("click", closeEditor);
document.getElementById("editorModal").addEventListener("click", event => { if(event.target.id === "editorModal") closeEditor(); });
document.getElementById("closeReader").addEventListener("click", closeReader);
document.getElementById("readerBack").addEventListener("click", closeReader);
document.getElementById("readerModal").addEventListener("click", event => { if(event.target.id === "readerModal") closeReader(); });
document.addEventListener("keydown", event => { if(event.key === "Escape") { closeEditor(); closeReader(); } });

document.getElementById("storyForm").addEventListener("submit", event => {
  event.preventDefault();
  const title = document.getElementById("storyTitle").value.trim();
  const excerpt = document.getElementById("storyExcerpt").value.trim();
  const body = document.getElementById("storyBody").value.trim();
  const author = document.getElementById("authorName").value.trim() || "Guest Writer";
  const category = document.getElementById("storyCategory").value;
  if(!title || !excerpt || !body) { showToast("Please complete the title, introduction and story."); return; }
  const visuals = {Campus:"campus",Study:"study",Wellbeing:"wellbeing",Growth:"growth"};
  const story = {id:"custom-" + Date.now(),title,excerpt,body,author,category,visual:visuals[category] || "campus",read:`${Math.max(1,Math.ceil(body.split(/\s+/).length/180))} MIN READ`,custom:true};
  stories.unshift(story);
  saveCustomStories();
  activeCategory = "All";
  document.getElementById("searchInput").value = "";
  renderStories();
  event.target.reset();
  document.getElementById("authorName").value = "Guest Writer";
  closeEditor();
  document.getElementById("stories").scrollIntoView({behavior:"smooth"});
  showToast("Your story is published on this device ✳");
});
const menuToggle = document.getElementById("mobileMenu");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("show");
  menuToggle.setAttribute("aria-expanded", String(open));
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("show");
  menuToggle.setAttribute("aria-expanded", "false");
}));
renderStories();
