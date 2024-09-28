import HomePageInfo from "../models/HomePageInfo.js";

const updateHomePageInfo = async (req, res) => {
    try {
        const { title, content, images } = req.body;
        if(!title || !content || images.length <= 0 || images.length > 5) {
            return res.status(200).json({
                messages: 'Error'
            })
        }

        const homePageInfo = await HomePageInfo.findOneAndUpdate({}, {
            title,
            content,
            images
        },{ upsert: true, new: true })
        return res.status(200).json(homePageInfo);
    } catch (error) {
        console.log('Error - HomePageInfo controller: updateHomePageInfo', error);
    }
}

export default {
    updateHomePageInfo
}