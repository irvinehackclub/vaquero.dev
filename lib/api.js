import jwt from "jsonwebtoken";

export function issue (project) {
    try {
        return jwt.sign({
            data: project,
        }, process.env.API_VALIDATION_KEY, {
            expiresIn: 30
        });
    } catch (error) {
        console.error("Error issuing token:", error);
        return false;
    }
    
}

export function validate (token) {
    try {
        return jwt.verify(token, process.env.API_VALIDATION_KEY).data ?? false;
    } catch {
        return false;
    }
}

export default { issue, validate };