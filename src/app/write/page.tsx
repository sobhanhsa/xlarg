import Editor from "@/components/textEditor/EditorComponent";

import { getCategories } from "@/utils/getCats";

const WritePage  = async() => {
    const {categories} = await getCategories();

    console.log(categories);

    return (
        <div>
            <Editor cats={categories} />
        </div>
    )
};

export default WritePage;