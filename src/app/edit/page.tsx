import ClientEditPage from "./client";

import { getCategories } from "@/utils/getCats";



const EditPage = async() => {
    
    const {categories} = await getCategories();
    
    return (
        <div>
            <ClientEditPage cats={categories}/>
        </div>
    )
};

export default EditPage;