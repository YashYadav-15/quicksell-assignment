// import { useEffect, useState } from "react";

// const API = "https://api.quicksell.co/v1/internal/frontend-assignment";

// function App() {
//   const [users, setUsers] = useState([]);

//   const fetchApi = async (URL) => {
//     try {
//       const res = await fetch(URL);
//       const data = await res.json();
//       if (data.length > 0) {
//         setUsers(data);
//       }
//       console.log(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchApi(API);
//   }, []);

//   return (
//     <>
//       <div>
//         {users.map((user) => (
//           <div key={user.id}>{user[0].title}</div>
//         ))}
//       </div>
//     </>
//   );
// }

// export default App;

// ⭕⭕⭕⭕⭕⭕⭕ Final - > Chat GPT
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import "./index.css";
import { BiSolidCircle } from "react-icons/bi";
import {
  BsCircleHalf,
  BsCircle,
  BsThreeDots,
  BsFillExclamationSquareFill,
} from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { AiFillSignal, AiOutlinePlus } from "react-icons/ai";
import { MdSignalCellularAlt, MdSignalCellularAlt2Bar } from "react-icons/md";
import { LiaSignalSolid } from "react-icons/lia";
import Footer from "./components/Footer";
// import { BiCheck, BiError, BiQuestion, BiClock } from "react-icons/bi";

const getStatusIcon = (status) => {
  switch (status) {
    case "Open":
      return <BsCircleHalf />;
    case "Todo":
      return <BsCircle />;
    case "In Progress":
      return <BsCircleHalf />;
    case "Resolved":
      return <BiSolidCircle />;
    case "Backlog":
      return <RxCross2 />;
    case "Closed":
      return <RxCross2 />;
    case "Done":
      return <BsCircleHalf />;
    default:
      return <BsCircleHalf />;
  }
};

const getPriority = (value) => {
  switch (value) {
    case 4:
      return (
        <span>
          {" "}
          <BsFillExclamationSquareFill />
          &nbsp; Urgent
        </span>
      );
    case 3:
      return (
        <span>
          {" "}
          <AiFillSignal />
          &nbsp; High
        </span>
      );
    case 2:
      return (
        <span>
          {" "}
          <MdSignalCellularAlt />
          &nbsp; Medium
        </span>
      );
    case 1:
      return (
        <span>
          {" "}
          <MdSignalCellularAlt2Bar />
          &nbsp; Low
        </span>
      );
    case 0:
      return (
        <span>
          {" "}
          <BsThreeDots />
          &nbsp; No Priority
        </span>
      );
    default:
      return <span>Urgent</span>;
  }
};

const App = () => {
  const [data, setData] = useState({ tickets: [], users: [] });
  const [selectedGrouping, setSelectedGrouping] = useState("status");
  const [selectedOrdering, setSelectedOrdering] = useState("priority");

  useEffect(() => {
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => response.json())
      .then((data) => setData(data));
    // .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const uniqueStatuses = [
    ...new Set(data.tickets.map((ticket) => ticket.status)),
  ];

  const uniquePriorities = [
    ...new Set(data.tickets.map((ticket) => ticket.priority)),
  ];

  const sortTicketsByPriority = (tickets) => {
    return tickets.slice().sort((a, b) => b.priority - a.priority);
  };

  const handleGroupingSelection = (grouping) => {
    setSelectedGrouping(grouping);
  };

  const sortTicketsByTitle = (tickets) => {
    return tickets.slice().sort((a, b) => a.title.localeCompare(b.title));
  };

  const handleOrderingSelection = (ordering) => {
    setSelectedOrdering(ordering);
  };

  // const sortTickets = (tickets) => {
  //   if (selectedOrdering === "priority") {
  //     return sortTicketsByPriority(tickets);
  //   } else if (selectedOrdering === "title") {
  //     return sortTicketsByTitle(tickets);
  //   }
  //   return tickets;
  // };

  const sortTickets = (tickets) => {
    if (selectedOrdering === "priority") {
      if (selectedGrouping === "user") {
        return tickets.map((user) => ({
          ...user,
          tickets: sortTicketsByPriority(user.tickets),
        }));
      }
      return sortTicketsByPriority(tickets);
    } else if (selectedOrdering === "title") {
      if (selectedGrouping === "user") {
        return tickets.map((user) => ({
          ...user,
          tickets: sortTicketsByTitle(user.tickets),
        }));
      }
      return sortTicketsByTitle(tickets);
    }
    return tickets;
  };

  return (
    <div>
      <Navbar
        onSelectGrouping={handleGroupingSelection}
        onSelectOrdering={handleOrderingSelection}
      />

      {/* ⭕⭕⭕⭕⭕⭕⭕⭕ Status => */}
      {/* 
      <div className="header">
        {data.tickets.map((ticket) => (
          <div className="card" key={ticket.id}>
            <span>{ticket.status}</span>
          </div>
        ))}
      </div> */}

      {/* ⭕⭕⭕⭕⭕⭕⭕⭕ Username Along With their respective Tickets => */}

      <div className="header">
        {selectedGrouping === "user" &&
          data.users.map((user) => (
            <div className="card" key={user.id}>
              {/* <span>{user.name}</span> */}
              <ul style={{ listStyleType: "none" }}>
                <li>{user.name}</li>
                <li>
                  Number of Tickets:{" "}
                  {
                    data.tickets.filter((ticket) => ticket.userId === user.id)
                      .length
                  }
                </li>
              </ul>
              <div className="ticket-list">
                {sortTicketsByPriority(
                  data.tickets
                    .filter((ticket) => ticket.userId === user.id)
                    .map((ticket) => (
                      <div
                        className="card"
                        key={ticket.id}
                        style={
                          ({ margin: "0" },
                          { padding: "0" },
                          { boxSizing: "border-box" })
                        }
                      >
                        <span>{ticket.id}</span>
                        <br />
                        <span>{ticket.title.substring(0, 70)}...</span>
                      </div>
                    ))
                )}
              </div>
            </div>
          ))}
      </div>

      {/* //////////////////////////////////////////////// */}

      {/* //////////////////////////////////////////////////////// */}

      {/* ⭕⭕⭕⭕⭕⭕⭕⭕ Progress along with their tickets => */}

      <div className="header">
        {selectedGrouping === "status" &&
          uniqueStatuses.map((status) => {
            const ticketsWithStatus = data.tickets.filter(
              (ticket) => ticket.status === status
            );

            return (
              <div
                className="card"
                key={status}
                style={({ border: "none" }, { boxShadow: "none" })}
              >
                <ul style={{ listStyleType: "none" }}>
                  <li className="badge">
                    {getStatusIcon(status)} {status}
                    <li>Number of Tickets: {ticketsWithStatus.length}</li>{" "}
                  </li>

                  {ticketsWithStatus.map((ticket) => (
                    <div
                      className="card"
                      style={
                        ({ margin: "0" },
                        { padding: "0" },
                        { boxSizing: "border-box" })
                      }
                    >
                      <li key={ticket.id}>
                        <h4 style={{ color: "grey" }}>{ticket.id}</h4>

                        <span>{ticket.title.substring(0, 70)}...</span>
                      </li>
                    </div>
                  ))}
                </ul>
              </div>
            );
          })}
      </div>

      {/* ⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕ Priority along with tickets */}

      <section>
        <div className="header">
          {selectedGrouping === "priority" &&
            uniquePriorities.map((priority) => {
              const ticketsWithPriority = data.tickets.filter(
                (ticket) => ticket.priority === priority
              );

              return (
                <div
                  className="card"
                  key={priority}
                  style={{ border: "none", boxShadow: "none" }}
                >
                  <ul style={{ listStyleType: "none" }}>
                    <li className="badge">
                      {" "}
                      {getPriority(priority)} {priority}
                      {
                        <span style={{ marginLeft: "50px" }}>
                          <AiOutlinePlus />
                          <BsThreeDots />
                        </span>
                      }
                    </li>
                    <li>Number of Tickets: {ticketsWithPriority.length}</li>{" "}
                    {/* Add this line */}
                    {ticketsWithPriority.map((ticket) => (
                      <div
                        className="card"
                        style={{
                          margin: "0",
                          padding: "0",
                          boxSizing: "border-box",
                        }}
                        key={ticket.id}
                      >
                        <li>
                          <h4 style={{ color: "grey" }}>{ticket.id}</h4>
                          <span>{ticket.title.substring(0, 70)}...</span>
                        </li>
                      </div>
                    ))}
                  </ul>
                </div>
              );
            })}
        </div>
      </section>

      {/* <section>
        <div className="container">
          {data.tickets.map((ticket) => (
            <div className="card">
              <ul key={ticket.id} style={{ listStyleType: "none" }}>
                <li>{ticket.id}</li>
                <li>{ticket.title}</li>
                <li>{ticket.userId}</li>
                <li>{ticket.status}</li>
                <li>{ticket.priority}</li>
              </ul>
            </div>
          ))}
        </div>
      </section> */}
      {/* 
      <h1>Tickets</h1>

      {data.tickets.map((ticket) => (
        <div className="card">
          <ul key={ticket.id} style={{ listStyleType: "none" }}>
            <li>{ticket.id}</li>
            <li>{ticket.title}</li>
            <li>{ticket.userId}</li>
            <li>{ticket.status}</li>
            <li>{ticket.priority}</li>
          </ul>
        </div>
      ))} */}

      {/* <ul>
        {data.tickets.map((ticket) => (
          <li key={ticket.id}>
            <strong>{ticket.title}</strong> - {ticket.status}
          </li>
        ))}
      </ul> */}

      {/* ⭕⭕⭕⭕⭕⭕⭕⭕ */}
      {/* <h1>Users</h1>

      {data.users.map((user) => (
        <div>
          <ul key={user.id} style={{ listStyleType: "none" }}>
            <li className="card">{user.name}</li>
          </ul>
        </div>
      ))} */}
      {/* ⭕⭕⭕⭕⭕⭕⭕⭕ */}

      {/* <ul>
        {data.users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul> */}

      <Footer />
    </div>
  );
};

export default App;

// ///////////////////////////////////////////////////
// import React, { useState, useEffect } from "react";
// import { fetchTickets } from "../src/components/fetchTickets";

// function App() {
//   const [tickets, setTickets] = useState([]);
//   const [grouping, setGrouping] = useState("status"); // Default grouping

//   useEffect(() => {
//     fetchTickets().then((data) => setTickets(data));
//   }, []);

//   // Helper function to sort the tickets based on priority
//   const sortTickets = (tickets) => {
//     return tickets.slice().sort((a, b) => b.priority - a.priority);
//   };

//   // Helper function to render individual ticket cards
//   const renderTicketCard = (ticket) => {
//     return (
//       <div key={ticket.id} className="ticket-card">
//         <h3>{ticket.title}</h3>
//         <p>Priority: {ticket.priority}</p>
//         <p>Status: {ticket.status}</p>
//         <p>User: {ticket.user}</p>
//       </div>
//     );
//   };

//   // Render the Kanban board based on selected grouping
//   const App = () => {
//     let groupedTickets = {};

//     if (grouping === "status") {
//       groupedTickets = tickets.reduce((acc, ticket) => {
//         const status = ticket.status;
//         acc[status] = [...(acc[status] || []), ticket];
//         return acc;
//       }, {});
//     } else if (grouping === "user") {
//       groupedTickets = tickets.reduce((acc, ticket) => {
//         const user = ticket.user;
//         acc[user] = [...(acc[user] || []), ticket];
//         return acc;
//       }, {});
//     } else if (grouping === "priority") {
//       const sortedTickets = sortTickets(tickets);
//       groupedTickets = { All: sortedTickets };
//     }

//     return Object.keys(groupedTickets).map((groupKey) => (
//       <div key={groupKey} className="ticket-group">
//         <h2>{groupKey}</h2>
//         {groupedTickets[groupKey].map(renderTicketCard)}
//       </div>
//     ));
//   };

//   return (
//     // <div className="kanban-board">
//     //   <div className="grouping-options">
//     //     {/* Implement your grouping options buttons here */}
//     //   </div>
//     //   <div className="sorting-options">
//     //     {/* Implement your sorting options buttons here */}

//     //   </div>
//     //   {/* {renderKanbanBoard()} */}
//     // </div>
//     //////////////////////////////////////////////////////
//     // <div className="kanban-board">
//     //   <div className="grouping-options">
//     //     <button onClick={() => setGrouping("status")}>Group by Status</button>
//     //     <button onClick={() => setGrouping("user")}>Group by User</button>
//     //     <button onClick={() => setGrouping("priority")}>
//     //       Group by Priority
//     //     </button>
//     //   </div>
//     //   <div className="sorting-options">
//     //     <button onClick={() => setTickets(sortTickets(tickets))}>
//     //       Sort by Priority
//     //     </button>
//     //     <button
//     //       onClick={() =>
//     //         setTickets(
//     //           [...tickets].sort((a, b) => a.title.localeCompare(b.title))
//     //         )
//     //       }
//     //     >
//     //       Sort by Title
//     //     </button>
//     //   </div>
//     //   {/* {renderKanbanBoard()} */}
//     // </div>
//     ////////////////////////////////////////////////////////
//     // <div className="kanban-board">
//     //   <div className="grouping-options">
//     //     <button onClick={() => setGrouping("status")}>Group by Status</button>
//     //     <button onClick={() => setGrouping("user")}>Group by User</button>
//     //     <button onClick={() => setGrouping("priority")}>
//     //       Group by Priority
//     //     </button>
//     //   </div>
//     //   <div className="sorting-options">
//     //     <button onClick={() => setTickets(sortTickets(tickets))}>
//     //       Sort by Priority
//     //     </button>
//     //     <button
//     //       onClick={() =>
//     //         setTickets(
//     //           [...tickets].sort((a, b) => a.title.localeCompare(b.title))
//     //         )
//     //       }
//     //     >
//     //       Sort by Title
//     //     </button>
//     //   </div>
//     //   <div className="ticket-groups">
//     //     {grouping === "status" &&
//     //       tickets.reduce((acc, ticket) => {
//     //         const status = ticket.status;
//     //         acc[status] = [...(acc[status] || []), ticket];
//     //         return acc;
//     //       }, {})}
//     //     {grouping === "user" &&
//     //       tickets.reduce((acc, ticket) => {
//     //         const user = ticket.user;
//     //         acc[user] = [...(acc[user] || []), ticket];
//     //         return acc;
//     //       }, {})}
//     //     {grouping === "priority" && sortTickets(tickets)}
//     //   </div>
//     // </div>

//     /////////////////////////////////////////////////////////////

//     <div className="kanban-board">
//       <div className="grouping-options">
//         <button onClick={() => setGrouping("status")}>Group by Status</button>
//         <button onClick={() => setGrouping("user")}>Group by User</button>
//         <button onClick={() => setGrouping("priority")}>
//           Group by Priority
//         </button>
//       </div>
//       <div className="sorting-options">
//         <button onClick={() => setTickets(sortTickets(tickets))}>
//           Sort by Priority
//         </button>
//         <button
//           onClick={() =>
//             setTickets(
//               [...tickets].sort((a, b) => a.title.localeCompare(b.title))
//             )
//           }
//         >
//           Sort by Title
//         </button>
//       </div>
//       {/* <div className="ticket-groups">
//         {grouping === "status" &&
//           Object.entries(
//             tickets.reduce((acc, ticket) => {
//               const status = ticket.status;
//               acc[status] = [...(acc[status] || []), ticket];
//               return acc;
//             }, {})
//           ).map(([status, groupedTickets]) => (
//             <div key={status} className="ticket-group">
//               <h2>{status}</h2>
//               {groupedTickets.map((ticket) => (
//                 <div key={ticket.id} className="ticket-card">
//                   <h3>{ticket.title}</h3>
//                   <p>Priority: {ticket.priority}</p>
//                   <p>Status: {ticket.status}</p>
//                   <p>User: {ticket.user}</p>
//                 </div>
//               ))}
//             </div>
//           ))}
//         {grouping === "user" &&
//           Object.entries(
//             tickets.reduce((acc, ticket) => {
//               const user = ticket.user;
//               acc[user] = [...(acc[user] || []), ticket];
//               return acc;
//             }, {})
//           ).map(([user, groupedTickets]) => (
//             <div key={user} className="ticket-group">
//               <h2>{user}</h2>
//               {groupedTickets.map((ticket) => (
//                 <div key={ticket.id} className="ticket-card">
//                   <h3>{ticket.title}</h3>
//                   <p>Priority: {ticket.priority}</p>
//                   <p>Status: {ticket.status}</p>
//                   <p>User: {ticket.user}</p>
//                 </div>
//               ))}
//             </div>
//           ))}
//         {grouping === "priority" &&
//           sortTickets(tickets).map((ticket) => (
//             <div key={ticket.id} className="ticket-card">
//               <h3>{ticket.title}</h3>
//               <p>Priority: {ticket.priority}</p>
//               <p>Status: {ticket.status}</p>
//               <p>User: {ticket.user}</p>
//             </div>
//           ))}
//       </div> */}
//     </div>
//   );
// }

// export default App;
