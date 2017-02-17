Array.prototype.first = function(callback, context) {
	let i = this.length - 1;
	for (; i >= 0; i--) {
		if (i in this) {
			if (!callback || callback.call(context, this[i], i, this)) return this[i];
		}
	}
	return undefined;
};

Array.prototype.last = function(callback, context) {
	let i = this.length - 1;
	for (; i >= 0; i--) {
		if (i in this) {
			if (!callback || callback.call(context, this[i], i, this)) return this[i];
		}
	}
	return undefined;
};

Array.prototype.contains = function (value) {
	let i = 0, n = this.length;
	for (; i < n; i++) {
		if (i in this && this[i] === value) {
			return true;
		}
	}
	return false;
};

Array.prototype.any = function (callback, context) {
	return this.first(callback,context) !== undefined;
};

Array.prototype.shuffle = function () {
	let i, j, temp;

	for (i = this.length - 1; i > 0; i -= 1) {
		j = Math.floor(Math.random() * (i + 1));
		temp = this[i];
		this[i] = this[j];
		this[j] = temp
	}
	return this;
};

Array.prototype.sum = function (callback, context /*opt*/) {
	let sum = 0, cur;
	for (let i = 0, n = this.length; i < n; i++) {
		if (i in this) {
			if (typeof callback === 'function') cur = callback.call(context, this[i], i, this);
			else cur = this[i];

			if (cur != null) sum += cur;
		}
	}
	return sum;
};

Array.prototype.equals = function(b) {
	let a = this;
	if (!Array.isArray(b) || a.length != b.length) return false;
	for (let i = 0, n = this.length; i < n; i ++) {
		if (a[i] != b[i]) return false;
	}
	return true;
};