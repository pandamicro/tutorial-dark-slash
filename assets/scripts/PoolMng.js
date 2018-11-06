const NodePool = require('NodePool');
const FoeType = require('Types').FoeType;
const ProjectileType = require('Types').ProjectileType;

cc.Class({
    extends: cc.Component,

    properties: {
        foePools: {
            default: [],
            type: NodePool
        },
        projectilePools: {
            default: [],
            type: NodePool
        }
    },

    // use this for initialization
    init () {
        this.fPools = [];
        for (let i = 0; i < this.foePools.length; ++i) {
            // this.foePools[i].init();
            this.fPools.push(new cc.NodePool());
        }

        this.pPools = [];
        for (let i = 0; i < this.projectilePools.length; ++i) {
            // this.projectilePools[i].init();
            this.pPools.push(new cc.NodePool());
        }
    },

    requestFoe (foeType) {
        let thePool = this.fPools[foeType];
        let prefab = this.foePools[foeType].prefab;
        var foe = thePool.get() || cc.instantiate(prefab);
        if (foe)
            foe.active = true;
        return foe;
    },

    returnFoe (foeType, obj) {
        obj.active = false;
        let thePool = this.fPools[foeType];
        thePool.put(obj);
        // obj.parent = null;
    },

    requestProjectile (type) {
        let thePool = this.pPools[type];
        let prefab = this.projectilePools[type].prefab;
        var projectile = thePool.get() || cc.instantiate(prefab);
        if (projectile)
            projectile.active = true;
        return projectile;
    },

    returnProjectile (type, obj) {
        obj.active = false;
        let thePool = this.pPools[type];
        thePool.put(obj);
        // obj.parent = null;
    }
});
