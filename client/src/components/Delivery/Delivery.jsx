import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAlert } from "react-alert";
import "./../../App.css";

const Delivery = (props) => {
  const alert = useAlert();
  const [isLoading, setIsLoading] = useState(false);

  const assignDelivery = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const deliveryLocation = localStorage.getItem("deliverAddress");
    try {
      const locationdata = await latAndLng(deliveryLocation);
      await assign(
        "PRODUCT_ID",
        7.2906,
        80.6337,
        locationdata.geometry.lat,
        locationdata.geometry.lng
      );
    } catch (err) {}
    alert.success("Succesfull");
    setIsLoading(false);
    props.history.push("/");
  };

  const latAndLng = (address) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `/geocode/v1/json?q=${address}&key=ba8d7ce853e84e10bcf175a92288ca6d`
        )
        .then((res) => {
          if (
            res.data.results[0] !== undefined ||
            res.data.results[0] !== null
          ) {
            resolve(res.data.results[0]);
          }
        })
        .catch((err) => reject(err));
    });
  };

  const assign = (productId, startLat, startLng, endLat, endLng) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `https://sandbox-api.uber.com/v1.2/requests`,
          {
            fare_id: "abcd",
            product_id: productId,
            start_latitude: startLat,
            start_longitude: startLng,
            end_latitude: endLat,
            end_longitude: endLng,
          },
          {
            Headers: {
              "Content-Type": "application/json",
              Authorization: "3276uijksds78ds8dysdjksd89sdsods",
            },
          }
        )
        .then((res) => resolve("ok"))
        .catch((err) => reject("error"));
    });
  };

  return (
    <>
      <div
        class="page-header header-filter smooth_load"
        style={{
          backgroundImage: "url('../assets/img/map.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div class="container" style={{ marginTop: 120 }}>
          <div class="row">
            <div class="col-lg-8 col-md-6 ml-auto mr-auto">
              <div class="card card-login">
                <form class="form" method="" action="">
                  <div class="card-header card-header-danger text-center">
                    <h4 class="card-title">Choose Delivery provider</h4>
                  </div>
                  <h6
                    class="description text-center text-grey"
                    style={{ marginBottom: -30 }}
                  ></h6>
                  <div class="card-body">
                    <div class="input-group">
                      <img
                        src="../assets/img/3333449.jpg"
                        class="img-fluid"
                        alt="Responsive image"
                      />
                    </div>
                  </div>
                  Delivery available to {localStorage.getItem("deliverAddress")}
                  <div class="dropdown">
                    <button
                      class="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Uber
                    </button>
                    <div
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <a class="dropdown-item" href="#" disabled>
                        Pick Me
                      </a>
                      <a class="dropdown-item" href="#" disabled>
                        DHL
                      </a>
                    </div>
                  </div>
                  <div class="footer text-center" style={{ marginBottom: 20 }}>
                    {!isLoading ? (
                      <button
                        onClick={(e) => assignDelivery(e)}
                        class="btn btn-danger btn-round"
                        style={{ marginTop: 30, marginBottom: 0 }}
                      >
                        Confirm
                      </button>
                    ) : (
                      <Loader
                        type="ThreeDots"
                        color="red"
                        height={50}
                        width={50}
                        //3 secs
                      />
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Delivery;
