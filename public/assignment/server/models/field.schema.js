module.exports = function(mongoose){

    var optionSchema = mongoose.Schema({
       label:String,
        value:String
    });
    var fieldSchema = mongoose.Schema({
        label: String,
        fieldType : {
            type: String,
            enum: ["TEXT", "TEXTAREA", "RADIOS", "CHECKBOXES","OPTIONS","DATE"]
        },
        options:[optionSchema],
        placeholder: String,

    });
    return fieldSchema;
}