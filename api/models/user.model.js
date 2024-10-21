import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    profilepicture:{
        type:String,
        default:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALkAAACUCAMAAAD4QXiGAAAAMFBMVEXk5ueutLfp6+y2vL6rsbWor7Lb3t/Y29zU2Nnh4+SzubzJzc/e4OK8wcTEyMrP0tQKLapiAAAELklEQVR4nO2c13LrOAxARbA36f//9lIl69iRbTYR5KzOQyaTpxMOCDZA03Rzc3Nzc/MFAGyDHJxabEApjW0SjxbLTBnnnLH1J2d0XkT3/jBJ6wln5AnGibey69AB5Q170T7kmfH9uoOg5FT7kCfe9enu/GuU/HHnvsd4V5/G+wdOFLbnK3qO8N6YsVWf0T5WnDCKLfsbF6u9089EldEDfiCxjQ9Uojdhpg91aVLNg7rAtg7odPFVHT/UgaYG+a7usdXB8hzxoG6RzWWe9wruLNU0W5zh7mFsVpAf6guiuMjJKw8QBz16m3UKt2j5xRWJB7DEoWzI18yINOiQmcofGCTx3EXoFwvKoEN+Lv+BeQzxSRSLE0Ix9oxgK5jjhEv80fM9DOM8LcrDPEAR1tHkM9w57QMdlgrBEnYACDdHpQvoYd7+gJFwN/QJhFOdzjt//qH9jZcr25o/GNacNTcXdYKF8Nu8vXnzRfQe8/bm4+aWcfP5uGvouPuWSntFjMvocffnw56JBj6Hjnv2r3LfwlDuW4a94xr4XhFKHokOcO5yp6n8/hzppWjcN4vid6L2e/P/KBt0NuO9/Y/7Hlr0Bs0x36AHfvcHlT/oyBVR49a3TFNmTRHFrikKoZ435vjimbVzDtt6Y9h6xQlk6iztpyA6rbyViR6C/ECYeHejOxIP28b4+vPuyv6jav5ZRyH+wPlvE7XTPos1x3zubWG0p6n5DKjg/rafSHXrPa09XMp6dtrDpaaexTe0XLzZ2+b2zjnjF9lnfJ+hhbJ2nq1V/Tf7vQIH2B6RrKZaOyGlVDvhN+Gcnjr+H4KZkypEiPeUGkP2MGfEGEqpD4GzKNdfl24QWqdlYLf9mxO3v4b/wSrXz+iHTDjT8yx+mtiJX3qYtFqc5O9vhEQ5o+ZJ0GfLTuTQ87U7GidsIIz2m6U+Up4E+eYLK4DyJGZb+03e2MbuCymvPT/k+dzurUjYat6bO5ubXAWAtqam9+ZOWrjbStUhL+5mvjbRgCyflW/lr3w00l9PmkXq152ul4RLlTz3+YrebnD+Wu1NndZ/2gV19YDv6vU/ZFDhpTzSnVa9oL52ar6ok3q3G+BoO3FSsbYL5CWLzyfqvH6BbDI3n6izKl24bL6Hl6eYK9f7j+qlAQMCR7xc3TWfnA+KltNKZcOZlCTHuWkef6HgubdSU1++enZNYHE7fym5nzLI/DJLVbI++Fanz7mMvC9gFVaXVSInq9fpRigk51NMNSqdK5BRNNXFkJOMOlKHuQb9hicWkgLqsv9E6qD3MuSpDQ3Y6/4TSTkdusjlP6TcBRR8H6w+KcXePSz8D5JKj/vJLCsJ1Y2uSmNZNRI+lpZRr3olCTuAnnIiSQr0Zhe3kUQ3NMZ/tbcR0Udp3LuKE1jsJl37tZimIxLSInRGtPjNzc3N/5Z/JnI9gYF/E/QAAAAASUVORK5CYII=",

    }
},
{timestamps:true},
)
const User=mongoose.model('User',userSchema);

export default User;