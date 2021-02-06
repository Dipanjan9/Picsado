import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";

const Navbar1 = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  const renderList = () => {
    if (state) {
      return [
        <li>
          <Link to="/CreatePost">
            <i className="large material-icons">add_a_photo</i>
          </Link>
        </li>,

        <li>
          <Link to="/Profile">Profile</Link>
        </li>,
        <li>
          <Link to="/SubPosts">Following Posts</Link>
        </li>,
        <li>
          <button
            className="btn waves-effect waves-light #e91e63 pink"
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              history.push("/Login");
            }}
          >
            Logout
          </button>
        </li>,
      ];
    } else {
      return [
        <li>
          <Link to="/Login">Login</Link>
        </li>,
        <li>
          <Link to="/Signup">Signup</Link>
        </li>,
      ];
    }
  };

  const M = window.M;
  document.addEventListener("DOMContentLoaded", function () {
    var elems = document.querySelectorAll(".sidenav");
    var instances = M.Sidenav.init(elems, {});
  });
  return (
    <div>
      <nav>
        <div className="nav-wrapper white">
          <Link to={state ? "/" : "/login"} className="brand-logo">
            Picsado
          </Link>
          <a href="#" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">{renderList()}</ul>
        </div>
      </nav>

      <ul className="sidenav" id="mobile-demo">
        {renderList()}
      </ul>
    </div>
  );
};

// class Navbar1 extends Component {
//   componentDidMount() {
//     const { state, dispatch } = useContext(UserContext);
//     const renderList = () => {
//       if (state) {
//         return [
//           <li>
//             <Link to="/CreatePost">
//               <i class="large material-icons">add_a_photo</i>
//             </Link>
//           </li>,

//           <li>
//             <Link to="/Profile">Profile</Link>
//           </li>,
//         ];
//       }
//       return [
//         <li>
//           <Link to="/Login">Login</Link>
//         </li>,
//         <li>
//           <Link to="/Signup">Signup</Link>
//         </li>,
//       ];
//     };

//     const M = window.M;
//     document.addEventListener("DOMContentLoaded", function () {
//       var elems = document.querySelectorAll(".sidenav");
//       var instances = M.Sidenav.init(elems, {});
//     });
//   }

//   render() {
//     return (
//       <div>
//         <nav>
//           <div className="nav-wrapper white">
//             <Link to="/" className="brand-logo">
//               Picsado
//             </Link>
//             <a href="#" data-target="mobile-demo" className="sidenav-trigger">
//               <i className="material-icons">menu</i>
//             </a>
//             <ul className="right hide-on-med-and-down">
//               <renderList />
//             </ul>
//           </div>
//         </nav>

//         <ul className="sidenav" id="mobile-demo">
//           <renderList />
//         </ul>
//       </div>
//     );
//   }
// }

export default Navbar1;
