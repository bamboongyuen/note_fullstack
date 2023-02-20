export default function useValidator() {
    const VALIDATE = {
        require: (value, msg = 'This field is require.') => {
            return value || value === 0 ? null : msg;
        },
        email: (value, msg = 'This field must be an email.') => {
            return value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) ? null : msg;
        },
        min: (num) => {
            return (value, msg = `This field need minimum ${num} charater.`) => {
                return value.length >= num ? null : msg;
            };
        },
        length: (range) => {
            const [min, max] = range.split('-');
            return (value, msg = `This field need form ${min} to ${max} charater.`) => {
                return value.length >= min && value.length <= max ? null : msg;
            };
        },
        equal: (value, msg = `This field need to be equal before one.`) => {
            const [value1, value2] = value.split('</>');
            return value1 === value2 ? null : msg;
        },
    };

    return (input = []) => {
        if (!Array.isArray(input)) {
            input = [input];
        }
        let result = true;
        const notify = input.map((value) => {
            // [ {require: username, 'min:5': username, 'length:2-5': user} ,]
            let msg = null;
            for (let key in value) {
                let conditor = key;
                let validator = VALIDATE[key];
                if (key.includes(':')) {
                    const splitKey = key.split(':');
                    conditor = splitKey[0];
                    validator = VALIDATE[conditor](splitKey[1]);
                }
                msg = validator(value[key]);
                if (msg) {
                    result = false;
                    break;
                }
            }
            return msg;
        });
        return { result, notify };
    };
}
