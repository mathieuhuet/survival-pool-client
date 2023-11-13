export default async function getScores () {
  const today = new Date();
  const weekday = today.getDay();
  let from = '';
  let to = '';
  // NFL weeks are from thursday(4) to monday(1), so we'll fetch matches from wednesday(3) to the next tuesday(2) [sunday - saturday][0 - 6]
  if (weekday < 3) {
    today.setDate(today.getDate() - (weekday + 3));
    from = today.toISOString().slice(0, 4) + today.toISOString().slice(5, 7) + today.toISOString().slice(8, 10);
    today.setDate(today.getDate() + 6);
    to = today.toISOString().slice(0, 4) + today.toISOString().slice(5, 7) + today.toISOString().slice(8, 10);
  } else {
    today.setDate(today.getDate() - (weekday - 3));
    from = today.toISOString().slice(0, 4) + today.toISOString().slice(5, 7) + today.toISOString().slice(8, 10);
    today.setDate(today.getDate() + 6);
    to = today.toISOString().slice(0, 4) + today.toISOString().slice(5, 7) + today.toISOString().slice(8, 10);
  }
  console.log(`https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?dates=${from}-${to}`);
  const response = await fetch(`https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?dates=${from}-${to}`);
  return response.json();
}