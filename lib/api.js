import jwt from "jsonwebtoken";

export function issue (project) {
    return jwt.sign({
        data: project,
    }, 'secret', {
        expiresIn: 30
    });
    
}

export function validate (token) {
    try {
        return jwt.verify(token, 'secret').data ?? false;
    } catch {
        return false;
    }
}

export default { issue, validate };