import React, { useEffect, useState } from 'react'
import router from 'next/router'
import firebase from 'lib/firebase'

const Index = () => {
  const [name, setName] = useState<string>('')
  const [detail, setDetail] = useState<string>('')
  const [lat, setLat] = useState<number>(0)
  const [lng, setLng] = useState<number>(0)
  const [date, setDate] = useState<string>('')
  const submit = async () => {
    await firebase.firestore().collection('data').add({
      name,
      detail,
      lat,
      lng,
      date,
    })
    router.push('/')
  }

  useEffect(() => {
    const map = new window.google.maps.Map(document.getElementById('map2'), {
      center: { lat: 13.736717, lng: 100.523186 },
      zoom: 10.5,
    })
    let pre = null
    window.google.maps.event.addListener(map, 'click', (event) => {
      setLat(event.latLng.lat)
      setLng(event.latLng.lng)
      if (pre !== null) {
        pre.setMap(null)
      }
      const current = new window.google.maps.Marker({
        position: event.latLng,
        map: map,
      })
      pre = current
    })
  }, [])
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto relative">
        <div className="text-center mt-12">
          <h2 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
            ตำแหน่งที่ม็อบชุมนุม
          </h2>
        </div>
        <div className="mt-12">
          <form
            action="#"
            method="POST"
            className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
          >
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium leading-5 text-gray-700">
                ชื่อสถานที่
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  className="form-input py-3 px-4 block w-full transition ease-in-out duration-150"
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium leading-5 text-gray-700">
                รายละเอียด
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  className="form-input py-3 px-4 block w-full transition ease-in-out duration-150"
                  onChange={(event) => setDetail(event.target.value)}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium leading-5 text-gray-700">
                เวลา
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  className="form-input py-3 px-4 block w-full transition ease-in-out duration-150"
                  onChange={(event) => setDate(event.target.value)}
                />
              </div>
            </div>
          </form>
          <div id="map2" className="w-full h-map mt-6" />
        </div>
        <div className="sm:col-span-2 mt-8">
          <span className="w-full inline-flex rounded-md shadow-sm">
            <button
              type="button"
              onClick={() => submit()}
              className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700 transition ease-in-out duration-150"
            >
              ส่ง
            </button>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Index
