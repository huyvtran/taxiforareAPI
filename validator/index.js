exports.createPostValidator = (req, res, next) => {
    // title
    req.check('title', 'Skriv en titel').notEmpty();
    req.check('title', 'Titeln måste vara mellan 4 och 150 tecken').isLength({
        min: 4,
        max: 150
    });
    // body
    req.check('body', 'Skriv en beskrivning').notEmpty();
    req.check('body', 'Beskrivningen måste vara mellan 4 och 150 tecken').isLength({
        min: 4,
        max: 2000
    });
    // model
    req.check('model', 'fyll i bil modell').notEmpty();
    req.check('model', 'Beskrivningen måste vara mellan 4 och 20 tecken').isLength({
        min: 4,
        max: 20
    });
    // city
    req.check('city', 'Skriv in vilken stad det gäller').notEmpty();
    req.check('city', 'Staden måste vara mellan 4 och 20 tecken').isLength({
        min: 2,
        max: 20
    });
    // phone
    req.check('phone', 'Vänligen fyll i ett telefonnummer').notEmpty();
    req.check('phone', 'Telefonnumret måste vara mellan 4 och 15 tecken').isLength({
        min: 2,
        max: 15
    });
    // email
    req.check('email', 'Vänligen fyll i e-postadress').isEmail();
    req.check('email', 'e-postadressen måste vara mellan 4 och 20 tecken').isLength({
        min: 2,
        max: 20
    });
    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    // proceed to next middleware
    next();
};

exports.userSignupValidator = (req, res, next) => {
    // name is not null and between 4-10 characters
    req.check('name', 'Namn krävs').notEmpty();
    // email is not null, valid and normalized
    req.check('email', 'E-postadressen måste innehålla mellan 3 och 32 tecken')
        .matches(/.+\@.+\..+/)
        .withMessage('E-postmeddelandet måste innehålla @')
        .isLength({
            min: 4,
            max: 2000
        });
    // check for password
    req.check('password', 'Lösenord krävs').notEmpty();
    req.check('password')
        .isLength({ min: 6 })
        .withMessage('Lösenordet måste innehålla minst sex tecken')
        .matches(/\d/)
        .withMessage('Lösenordet måste innehålla ett nummer');
    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    // proceed to next middleware
    next();
};

exports.userSigninValidator = (request, response, next) => {
    request
        .check('email', 'E-postadressen måste innehålla mellan 3 och 32 tecken        ')
        .matches(
            /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        )
        .withMessage('Vänligen skriv din giltiga e-postadress        ')
        .isLength({
            min: 4,
            max: 32
        });
    request.check('password', 'Ogiltig social inloggningstoken!').notEmpty();
    request
        .check('password')
        .isLength({ min: 6 })
        .withMessage('Din sociala inloggningstoken är ogiltig!');
    const errors = request.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
};

exports.passwordResetValidator = (req, res, next) => {
    // check for password
    req.check('newPassword', 'lösenord krävs').notEmpty();
    req.check('newPassword')
        .isLength({ min: 6 })
        .withMessage('Lösenordet måste innehålla minst sex tecken')
        .matches(
            /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        )
        .withMessage('måste innehålla ett nummer')
        .withMessage('Lösenordet måste innehålla ett nummer');

    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    // proceed to next middleware or ...
    next();
};
