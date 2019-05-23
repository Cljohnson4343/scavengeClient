import User from "./user";
import ScavengeResource from "../scavengeResource";
import { BASE_PATH } from "../../config";
import { addTestModel } from "../../testUtils";

describe("user", () => {
  const testData = {
    userID: 21,
    firstName: "chris",
    lastName: "johnson",
    username: "cj_43",
    email: "cj433@gmail.com",
    imageURL: "scavenge.io",
    joinedAt: new Date(),
    lastVisit: new Date()
  };

  describe("constructor", () => {
    const cases = [
      {
        name: "constructs user with default args",
        args: null
      },
      {
        name: "constructs user with data object",
        args: testData
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        const result = new User(c.args);

        expect(result).toBeInstanceOf(User);
        expect(result).toBeInstanceOf(ScavengeResource);
        expect(result.basePath).toStrictEqual(BASE_PATH);
      });
    }
  });

  describe("copy", () => {
    const cases = [
      {
        name: "copies a default user",
        model: new User()
      },
      {
        name: "constructs user with data object",
        model: new User(testData)
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        const result = c.model.copy();

        expect(result).toBeInstanceOf(User);
        expect(result).toBeInstanceOf(ScavengeResource);
        expect(result.basePath).toStrictEqual(BASE_PATH);

        expect(result).toBeDeepEqual(c.model);
      });
    }
  });

  describe("equals", () => {
    const cases = [
      {
        name: "two default users should be equal",
        expect: expect(new User()).not.toBeDeepEqual.bind(null, new User())
      },
      {
        name: "two users constructed with same data should be equal",
        expect: expect(new User(testData)).not.toBeDeepEqual.bind(
          null,
          new User(testData)
        )
      },
      {
        name: "a default user should not equal a user instantiated with data",
        expect: expect(new User()).not.toBeDeepEqual.bind(
          null,
          new User(testData)
        )
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        c.expect();
      });
    }
  });

  describe("apiLogin", () => {
    const cases = [
      {
        name: "create a valid config for an api method call",
        model: addTestModel(new User(testData)),
        expected: {
          url: BASE_PATH + "/users/login/",
          method: "POST"
        }
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        c.model["apiLogin"]();

        const result = c.model.lastRequest();

        expect(result.url).toStrictEqual(c.expected.url);
        expect(result.method).toStrictEqual(c.expected.method);

        expect(result.data).not.toInclude("lastVisit");
        expect(result.data).not.toInclude("joinedAt");

        expect(result.data).toInclude("userID");
        expect(result.data).toInclude("firstName");
        expect(result.data).toInclude("lastName");
        expect(result.data).toInclude("username");
        expect(result.data.username.length).toBeLessThan(65);
        expect(result.data).toInclude("email");
      });
    }
  });

  describe("apiLogout", () => {
    const cases = [
      {
        name: "create a valid config for an api method call",
        model: addTestModel(new User(testData)),
        expected: {
          url: BASE_PATH + "/users/logout/",
          method: "POST"
        },
        data: {}
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        c.model["apiLogout"]();

        const result = c.model.lastRequest();

        expect(result.url).toStrictEqual(c.expected.url);
        expect(result.method).toStrictEqual(c.expected.method);
        expect(result.data).toStrictEqual(c.data);
      });
    }
  });

  describe("apiCreateUser", () => {
    const cases = [
      {
        name: "create a valid config for an api method call",
        model: addTestModel(new User(testData)),
        expected: {
          url: BASE_PATH + "/users/",
          method: "POST"
        }
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        c.model["apiCreateUser"]();

        const result = c.model.lastRequest();

        expect(result.url).toStrictEqual(c.expected.url);
        expect(result.method).toStrictEqual(c.expected.method);

        expect(result.data).not.toInclude("lastVisit");
        expect(result.data).not.toInclude("joinedAt");
        expect(result.data).not.toInclude("userID");

        expect(result.data).toInclude("firstName");
        expect(result.data).toInclude("lastName");
        expect(result.data).toInclude("username");
        expect(result.data.username.length).toBeLessThan(65);
        expect(result.data).toInclude("email");
      });
    }
  });

  describe("apiDeleteUser", () => {
    const cases = [
      {
        name: "create a valid config for an api method call",
        model: addTestModel(new User(testData)),
        expected: {
          url: BASE_PATH + `/users/${testData.userID}`,
          method: "DELETE"
        },
        data: {}
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        c.model["apiDeleteUser"]();

        const result = c.model.lastRequest();

        expect(result.url).toStrictEqual(c.expected.url);
        expect(result.method).toStrictEqual(c.expected.method);
        expect(result.data).toStrictEqual(c.data);
      });
    }
  });

  describe("apiUpdateUser", () => {
    const cases = [
      {
        name: "create a valid config for an api method call",
        model: addTestModel(new User(testData)),
        expected: {
          url: BASE_PATH + `/users/${testData.userID}`,
          method: "PATCH"
        }
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        c.model["apiUpdateUser"]();

        const result = c.model.lastRequest();

        expect(result.url).toStrictEqual(c.expected.url);
        expect(result.method).toStrictEqual(c.expected.method);

        expect(result.data).not.toInclude("joinedAt");
        expect(result.data).not.toInclude("lastVisit");
        expect(result.data).not.toInclude("userID");
      });
    }
  });

  describe("apiRetrieveUser", () => {
    const cases = [
      {
        name: "create a valid config for an api method call",
        model: addTestModel(new User(testData)),
        expected: {
          url: BASE_PATH + `/users/${testData.userID}`,
          method: "GET"
        },
        data: {}
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        c.model["apiRetrieveUser"]();

        const result = c.model.lastRequest();

        expect(result.url).toStrictEqual(c.expected.url);
        expect(result.method).toStrictEqual(c.expected.method);
        expect(result.data).toStrictEqual(c.data);
      });
    }
  });
  /*
  describe("integration", () => {
    const user = new User(
      Object.assign(testData, {
        email: getRandomEmail(),
        username: getRandomUsername()
      })
    );

    test("login", () => {
      expect.assertions(2);
      return user
        .apiLogin()
        .then(response => {
          expect(response.status).toBe(200);
          expect(response.headers).toInclude("scavenge_session");
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
  */
});
