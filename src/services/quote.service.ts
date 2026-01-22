export const quoteService = {
  fetchDailyQuote: async () => {
    const today = new Date().toISOString().split("T")[0];
    const stored = localStorage.getItem("daily_quote");

    // 1. Check Local Storage
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.date === today) {
        return { quote: parsed.quote, author: parsed.author };
      }
    }

    // 2. Fetch from API if no local data for today
    const res = await fetch(
      "https://motivational-spark-api.vercel.app/api/quotes/random"
    );
    const data = await res.json();

    // 3. Save to Local Storage
    localStorage.setItem(
      "daily_quote",
      JSON.stringify({
        quote: data.quote,
        author: data.author,
        date: today,
      })
    );

    return { quote: data.quote, author: data.author };
  },
};
