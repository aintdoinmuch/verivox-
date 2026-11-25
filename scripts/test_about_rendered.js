async function testAbout() {
  const res = await fetch("http://localhost:3000/about");
  const html = await res.text();
  console.log("Status:", res.status);
  console.log("Has Naman Garg:", html.includes("Naman Garg"));
  console.log("Has 26BCON1989:", html.includes("26BCON1989"));
  console.log("Has Project Lead & Developer:", html.includes("Project Lead &amp; Developer") || html.includes("Project Lead & Developer"));
  console.log("Has 21BCON:", html.includes("21BCON"));
  console.log("Has Student Name 1:", html.includes("Student Name 1"));
  console.log("Has 'Project Team Details':", html.includes("Project Team Details"));
}
testAbout();
