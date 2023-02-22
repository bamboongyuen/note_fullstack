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
        const flag = Array.isArray(input);
        if (!flag) input = [input];
        let result = true;
        const msg = input.map((item) => {
            let res;
            for (let key in item) {
                let validator = VALIDATE[key];
                if (key.includes(':')) {
                    let splitKey = key.split(':');
                    validator = VALIDATE[splitKey[0]](splitKey[1]);
                }
                res = validator(item[key]);
                if (res) {
                    result = false;
                    break;
                }
            }
            return res;
        });
        return flag ? { result, msg } : { result, msg: msg[0] };
    };
}
