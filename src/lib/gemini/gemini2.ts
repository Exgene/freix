import { PUBLIC_GEMINI_API_KEY } from '$env/static/public';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { json } from '@sveltejs/kit';

export const geminiFetchRoutes = async (
	source: string,
	dest: string,
	product: string
): Promise<any> => {
	const genAI = new GoogleGenerativeAI(PUBLIC_GEMINI_API_KEY);
	const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

	const prompt = `Give me 5 list of country names that fall in the 5 best trading routes between ${source} and ${dest}. And they have be the optimal routes. The output has to be only the 5 list of country names in JSON FORMAT ONLY, not even serial numbers or in bullets and NO explanation, NO description or NO comments. Here are few examples of 
    what you can return when asked to find best routes between USA and Bolivia -
    {
        "route1": ["USA", "Panama", "Bolivia"],
        "route2": ["USA", "Colombia", "Ecuador", "Peru", "Bolivia"],
        "route3": ["USA", "Chile", "Bolivia"],
        "route4": ["USA", "Brazil", "Paraguay", "Bolivia"],
        "route5": ["USA", "Argentina", "Bolivia"]
    }
`;

	const result = await model.generateContent(prompt);
	const response = result.response;
	let text = response.text();
	console.log(text);
	if (text[0] === '`') text = text.substring(7, text.length - 3);
	return JSON.parse(text);
};

export const geminiFetchTransactions = async (
	source: string,
	destination: string,
	product: string
) => {
	const genAI = new GoogleGenerativeAI(PUBLIC_GEMINI_API_KEY);
	const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

	const prompt = `Give me 5 list of mock transactions from ${source} to ${destination}. For this following product ${product}.
	Give this exact format. Price be in the currency of ${source} and Use accurate current price .If its illegal to import or due to trade restrictions return empty JSON as {}.
	. IF ITS POSSIBLE RETURN MOCK DATA IN THE GIVEN JSON FORMAT not even serial numbers or in bullets and NO explanation, NO description or NO comments. return mock data in json format that i can directly parse - 
    {
        "transaction1": ["product_name","date","price"],
        "transaction2": ["product_name","date","price"],
    }
`;

	const result = await model.generateContent(prompt);
	const response = result.response;
	let text = response.text();
	console.log(text);
	if (text[0] === '`') text = text.substring(7, text.length - 3);
	return JSON.parse(text);
};
