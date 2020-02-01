import React from 'react';
import './item.css';
import pistol from '../../assets/images/equipment/pistol.jpg';
import aaahh from '../../assets/images/equipment/aaahh.jpg';
import bagOfRice from '../../assets/images/equipment/bag-of-rice.jpg';
import baseballBat from '../../assets/images/equipment/baseball-bat.jpg';
import cannedFood from '../../assets/images/equipment/canned-food.jpg';
import chainsaw from '../../assets/images/equipment/chainsaw.jpg';
import crowbar from '../../assets/images/equipment/crowbar.jpg';
import fireAxe from '../../assets/images/equipment/fire-axe.jpg';
import flashLight from '../../assets/images/equipment/flash-light.jpg';
import gasoline from '../../assets/images/equipment/gasoline.jpg';
import glassBottle from '../../assets/images/equipment/glass-bottle.jpg';
import goalieMask from '../../assets/images/equipment/goalie-mask.jpg';
import katana from '../../assets/images/equipment/katana.jpg';
import machete from '../../assets/images/equipment/machete.jpg';
import molotov from '../../assets/images/equipment/molotov.jpg';
import pan from '../../assets/images/equipment/pan.jpg';
import plentyOfAmmoShotgun from '../../assets/images/equipment/plenty-of-ammo-shotgun.jpg';
import plentyOfAmmo from '../../assets/images/equipment/plenty-of-ammo.jpg';
import rifle from '../../assets/images/equipment/rifle.jpg';
import sawedOff from '../../assets/images/equipment/sawed-off.jpg';
import scope from '../../assets/images/equipment/scope.jpg';
import shotgun from '../../assets/images/equipment/shotgun.jpg';
import subMg from '../../assets/images/equipment/sub-mg.jpg';
import water from '../../assets/images/equipment/water.jpg';
import Weapon from './weapon';
import wounded from '../../assets/images/cards/wounded.jpeg';
import Item from './item';

export default function ItemItem(props) {
    const { item } = props;

    const source = () => {
        switch (item.name) {
            case 'bag of rice':
                return bagOfRice
            case 'baseball bat':
                return baseballBat
            case 'canned food':
                return cannedFood
            case 'flashlight':
                return flashLight
            case 'gasoline':
                return gasoline
            case 'glass bottle':
                return glassBottle
            case 'goalie mask':
                return goalieMask
            case 'katana':
                return katana
            case 'machete':
                return machete
            case 'pistol':
                return pistol
            case 'rifle':
                return rifle
            case 'sawed off':
                return sawedOff
            case 'shotgun':
                return shotgun
            case 'water':
                return water
            case 'molotov':
                return molotov
            case 'scope':
                return scope
            case 'sub mg':
                return subMg
            case 'plenty of ammo':
                return plentyOfAmmo
            case 'plenty of shells':
                return plentyOfAmmoShotgun
            case 'pan':
                return pan
            case 'chainsaw':
                return chainsaw
            case 'fire axe':
                return fireAxe
            case 'crowbar':
                return crowbar
            case 'aaahh':
                return aaahh
            case 'wounded':
                return wounded
            default:
                break;
        }
    }
    let style = item.name === 'wounded' ? 'wound' : 'card'; 
    let isItem = item instanceof Weapon || item instanceof Item;
    let display = isItem ? <img className={style} src={source()} alt="" /> : 'Empty'

    return (
        <div className="item-container">
            <div className="item">
                {display}
            </div>
        </div>
    )
}