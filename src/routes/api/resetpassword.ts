import {supabase} from "$lib/supabase";


export async function get({query}) {

	console.log(query.access_token);
	console.log(query.new_password);

}
