import {supabase} from "$lib/supabase";


export async function post(req) {

	const { query } = JSON.parse(req.body);
	const { access_token, new_password } = query;

	console.log(access_token);
	console.log(new_password);

	const { error } = await supabase.auth.api.updateUser(access_token, { password: new_password });
	if(error) {
		console.log(error)
		return {
			body: {
				success: false,
				error: error.message
			}
		}
	}
	else {
		return {
			body: {
				success: true
			}
		}
	}


}
