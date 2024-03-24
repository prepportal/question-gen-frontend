import wiki from 'wikipedia';

export async function getWikiSummary(title: string): Promise<string> {
  try {
    const response = await wiki.summary(title);
    return response.extract;
  } catch (error) {
    return 'Error fetching summary';
  }
}