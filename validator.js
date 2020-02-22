function validator(target, validator) {
    return new Proxy(target, {
        _validator: validator,
        set(target, key, value, proxy) {
            if (target.hasProperty(key)) {
                let va = this._validator[key];
                if (va(value)) {
                    return Reflect.set(target, key, value, proxy);
                } else {
                    throw Error(`${value} 不能赋值给 ${key}`);
                }
            } else {
                throw Error(`${key} 不存在`)
            }
        }
    }) 
}

const personValidator = {
    name(val) {
        return typeof val === "string"
    },
    age(val) {
        return typeof val === "number" && val >= 18
    }
}

class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
        return validator(this, personValidator);
    }
}
