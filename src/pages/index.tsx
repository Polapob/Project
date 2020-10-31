import React, { useEffect, useState, useCallback } from 'react'
import firebase from 'lib/firebase'
import router from 'next/router'

interface Position {
  lat: number
  lng: number
}

const initMap = (props: Position, marker: boolean) => {
  if (window.google) {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 10.5,
      center: props,
    })
    if (marker) {
      new window.google.maps.Marker({
        position: props,
        map: map,
      })
    }
  }
}

const Index = () => {
  const [state, setState] = useState<any[]>([])
  useEffect(() => {
    initMap({ lat: 13.736717, lng: 100.523186 }, false)
    const ret = firebase
      .firestore()
      .collection('data')
      .onSnapshot((data) => {
        let now = []
        data.forEach((doc) => {
          let v = doc.data()
          v.id = doc.id
          now.push(v)
        })
        setState([...state, ...now])
      })
    return () => {
      ret()
    }
  }, [])
  const remove = async (id: string) => {
    await firebase.firestore().doc(`data/${id}`).delete()
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto relative">
        <div className="text-center mt-12">
          <h2 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
            ตำแหน่งที่ม็อบชุมนุม
          </h2>
        </div>
        <div className="text-center mt-12">
          <span className="inline-flex rounded-md shadow-sm">
            <button
              type="button"
              onClick={() => {
                router.push('/submit')
              }}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700 transition ease-in-out duration-150"
            >
              ส่งข้อมูล
            </button>
          </span>
        </div>
        <div className="mt-12 flex flex-col-reverse lg:flex-row lg:justify-around">
          <div className="bg-white shadow overflow-hidden sm:rounded-md w-full lg:w-map">
            <ul>
              {state.map((data) => {
                return (
                  <li className="border-t border-gray-200">
                    <a
                      onClick={() =>
                        initMap({ lat: data.lat, lng: data.lng }, true)
                      }
                      className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
                    >
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="text-sm leading-5 font-medium text-green-600 truncate">
                            {data.name}
                          </div>
                          <span className="inline-flex rounded-md shadow-sm">
                            <button
                              type="button"
                              onClick={() => remove(data.id)}
                              className="inline-flex items-center px-3 py-2 border border-gray-300 text-xs leading-4 font-medium rounded text-red-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
                            >
                              X
                            </button>
                          </span>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">{data.detail}</div>
                          <div className="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mt-0">
                            <svg
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                clip-rule="evenodd"
                              />
                            </svg>
                            <span>{data.date}</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="flex justify-center mb-6 lg:ml-2 lg:mb-0">
            <div id="map" className="h-64 w-full lg:w-map lg:h-map" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
