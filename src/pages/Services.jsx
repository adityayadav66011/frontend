import { useAuth } from "../store/auth";

export const Services = () => {
  const { services } = useAuth();

  // Ensure services is an array before mapping over it
  if (!Array.isArray(services)) {
    return (
      <section className="section-services">
        <div className="container">
          <h1 className="main-heading">Services</h1>
        </div>
        <p>No services available</p>
      </section>
    );
  }

  return (
    <section className="section-services">
      <div className="container">
        <h1 className="main-heading">Services</h1>
      </div>

      <div className="container grid grid-three-cols">
        {services.map((curElem, index) => {
          const { price, description, provider, service } = curElem;
          return (
            <div className="card" key={index}>
              <div className="card-img">
                <img
                  src="/images/service.svg"
                  alt="our services info"
                  width="200"
                />
              </div>

              <div className="card-details">
                <div className="grid grid-two-cols">
                  <p>{provider}</p>
                  <p>{price}</p>
                </div>
                <h2>{service}</h2>
                <p>{description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
