const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey:process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

const generateImage = async (req,res) => {
    const { prompt, size } = req.body;

    //console.log(`req.body: ${req.body}`);

    const imageSize = size == 'small' ? '256x256' : size == 'medium' ? '512x512' : '1024x1024';
    
    try{
        const response = await openai.createImage({
            prompt:prompt,
            n:1,
            size: imageSize
        });

        //console.log(`response: ${response}`);
        const imageUrl = response.data.data[0].url;

        res.json({
            status:"success",
            url:imageUrl
        });

    } catch(err){
        console.log(`Generate Image Error: ${err}`);
        res.json({
            status:"failed",
            error:err.message || "Couldn't generate image"
        });
    }
}

module.exports = { generateImage }