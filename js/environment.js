const ENVIRONMENTS = {
    MAC: 1,
    WINDOWS : 2
}

const environment = ENVIRONMENTS.WINDOWS;

const httpUrl = environment ===  ENVIRONMENTS.WINDOWS ? "http://localhost/info2180-project-2" : "http://localhost:4000";