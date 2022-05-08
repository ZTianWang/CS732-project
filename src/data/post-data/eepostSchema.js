import mongoose,{Schema} from 'mongoose'

const eepostSchema = new Schema({
	entry_id : {type : String, unique: true},
	entry_title : {type : String, unique: true},
	content : {
        type : String, 
        unique: true,
        maxlength : 200,
        unique : true
    },
    rating : Number,
    user_id : String,
	// user_id : {
    //     type : Schema.Types.ObjectId,
    //     ref : 'User',
    //     required : true
    // },
	"commons" : [
		{
			type : Schema.Types.ObjectId,
            ref : 'Common'
		}
	]
})

const Eepost = mongoose.model('Eepost', eepostSchema)

export default Eepost