export const Login = () => {
  const onFetch = async () => {
    // api/route.ts
    const response = await fetch("http://localhost:3000/api/login", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "efpyi@example.com", password: "123" }),
      method: "POST",
    });

    console.log(await response.json());
  };
  return (
    <>
      <button onClick={onFetch} className="font-material">
        Fetch
      </button>
    </>
  );
};
