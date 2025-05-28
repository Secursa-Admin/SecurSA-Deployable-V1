export async function findMatchingProviders(supabase, quoteSuburb, quoteCity) {
  const { data: allProviders, error } = await supabase
    .from('providers')
    .select('*');

  if (error || !allProviders) {
    console.error('❌ Failed to fetch providers:', error?.message);
    return [];
  }

  const normalize = (val) => (val || '').toLowerCase().trim();

  const suburbMatches = [];
  const cityMatches = [];

  allProviders.forEach((provider) => {
    const suburbList = (provider.suburbs_serviced || '').split(',').map(normalize);
    const extraCities = (provider.extra_branches || '').split(',').map(normalize);
    const mainCity = normalize(provider.city);

    const inSuburb = suburbList.includes(normalize(quoteSuburb));
    const inCity = mainCity === normalize(quoteCity) || extraCities.includes(normalize(quoteCity));

    if (inSuburb) {
      suburbMatches.push(provider);
    } else if (inCity) {
      cityMatches.push(provider);
    }
  });

  const combined = [...shuffle(suburbMatches), ...shuffle(cityMatches)];
  return combined.slice(0, 5);
}

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}
