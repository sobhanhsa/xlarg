export const getCategories = async() => {
    const res = await fetch("http://localhost:3000/api/categories",{
        cache:"no-store"
    })

    if (!res.ok) {
        throw new Error("fetching categories failed")
    }

    return res.json()

}